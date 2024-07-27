import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import authService from "@/services/auth.service";
import profileService from "@/services/profile.service";

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: (credentials) => authService.signIn(credentials),
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const userProfile = await profileService.get(session.user.email);
      session.user.id = token.sub!;
      session.user.email = token.email!;
      (session.user as any).profile = userProfile;
      return session;
    },
  },
});
