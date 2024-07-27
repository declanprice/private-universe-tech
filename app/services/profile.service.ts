import { UserProfile } from "@prisma/client";

import { prisma } from "@/prisma";

export class ProfileService {
  async get(email: string): Promise<UserProfile | null> {
    return prisma.userProfile.findFirst({ where: { email } });
  }

  async create(
    email: string,
    username: string,
    jobTitle: string,
  ): Promise<UserProfile> {
    console.log(email, username, jobTitle);

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
