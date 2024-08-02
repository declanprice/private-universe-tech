import { NextRequest } from "next/server";
import dogsService from "@/services/dogs.service";
import { protectedRequest } from "@/shared/auth/protected";
import { AuthUser } from "@/shared/types/user";

export const GET = async (request: NextRequest) =>
  protectedRequest(request, async (body: any, user: AuthUser) => {
    try {
      const breeds = await dogsService.getBreeds();
      return Response.json(breeds);
    } catch (error) {
      return Response.json(
        { message: "Something went wrong." },
        { status: 500 },
      );
    }
  });
