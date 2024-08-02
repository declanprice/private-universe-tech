import { NextRequest } from "next/server";
import dogsService from "@/services/dogs.service";
import { protectedRequest } from "@/shared/auth/protected";
import { AuthUser } from "@/shared/types/user";

export const GET = async (
  request: NextRequest,
  { params }: { params: { breed: string } },
) =>
  protectedRequest(request, async (body: any, user: AuthUser) => {
    try {
      console.log(params.breed);
      const imageSrc = await dogsService.getImageSrc(params.breed);
      return Response.json(imageSrc);
    } catch (error) {
      return Response.json(
        { message: "Something went wrong." },
        { status: 500 },
      );
    }
  });
