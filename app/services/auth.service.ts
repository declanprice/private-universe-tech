import { prisma } from "@/prisma";
import { UserAlreadyExistsError } from "./errors/UserAlreadyExistsError";
import { UserWithProfile } from "@/shared/types/profile";
import { User } from "next-auth";

export class AuthService {
  private SECRET = process.env.NEXTAUTH_SECRET;

  async signUp(email: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      throw new UserAlreadyExistsError("user already exists");
    }

    const hash = this.encryptPassword(password);

    await prisma.user.create({
      data: {
        email,
        hash,
        emailVerified: new Date(),
      },
    });
  }

  async signIn(credentials: any): Promise<User> {
    console.log(credentials);

    return prisma.user.findUniqueOrThrow({
      where: {
        email: credentials.email,
      },
    });
  }

  private encryptPassword(password: string): string {
    return password;
  }

  decryptPassword(hash: string) {
    return hash;
  }
}

export default new AuthService();
