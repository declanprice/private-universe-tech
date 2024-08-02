import { prisma } from "@/prisma";
import { UserAlreadyExistsError } from "./errors/UserAlreadyExistsError";
import { User } from "next-auth";
import * as bcrypt from "bcrypt";

export class AuthService {
  async signUp(email: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      throw new UserAlreadyExistsError("user already exists");
    }

    const hash = this.hashPassword(password);

    await prisma.user.create({
      data: {
        email,
        hash,
        emailVerified: new Date(),
      },
    });
  }

  async signIn(credentials: {
    email: string;
    password: string;
  }): Promise<User> {
    console.log(credentials);

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: credentials.email,
      },
    });

    const isValidPassword = this.comparePassword(
      credentials.password,
      user.hash,
    );

    if (!isValidPassword) throw new Error("Invalid credentials");

    return user;
  }

  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, 12);
  }

  comparePassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

export default new AuthService();
