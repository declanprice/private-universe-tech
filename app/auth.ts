import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import authService from "@/services/auth.service";
import profileService from "@/services/profile.service";

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
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
    async jwt({ token }) {
      if (token.email) {
        const userProfile = await profileService.get(token.email);

        if (userProfile) {
          token.userProfile = userProfile;
        }
      }

      return token;
    },
  },
});
