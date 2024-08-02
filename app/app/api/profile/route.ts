import { NextRequest } from "next/server";
import profileService from "@/services/profile.service";
import { protectedRequest } from "@/shared/auth/protected";
import { AuthUser } from "@/shared/types/user";

export const POST = async (request: NextRequest) =>
  protectedRequest(request, async (body: any, user: AuthUser) => {
    try {
      const profile = await profileService.create(
        user.email,
        body.username,
        body.jobTitle,
      );
      return Response.json({ profile });
    } catch (error) {
      console.log(error);
      return Response.json(
        { message: "Something went wrong." },
        { status: 500 },
      );
    }
  });

export const PUT = async (request: NextRequest) =>
  protectedRequest(request, async (body: any, user: AuthUser) => {
    try {
      const profile = await profileService.update(
        user.email,
        body.username,
        body.jobTitle,
      );
      return Response.json({ profile });
    } catch (error) {
      console.log(error);
      return Response.json(
        { message: "Something went wrong." },
        { status: 500 },
      );
    }
  });
