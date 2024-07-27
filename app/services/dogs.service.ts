import { UserProfile } from "@prisma/client";

import { prisma } from "@/prisma";

export class DogsService {
  async getAll() {
    return [];
  }

  async get(breed: string) {}
}

export default new DogsService();
