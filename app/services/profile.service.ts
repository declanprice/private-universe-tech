import { UserProfile } from "@prisma/client";

import { prisma } from "@/prisma";

export class ProfileService {
  async get(email: string): Promise<UserProfile> {
    return prisma.userProfile.findUniqueOrThrow({ where: { email } });
  }

  async create(
    email: string,
    username: string,
    jobTitle: string,
  ): Promise<UserProfile> {
    return prisma.userProfile.create({
      data: {
        email,
        username,
        jobTitle,
      },
    });
  }
}

export default new ProfileService();
