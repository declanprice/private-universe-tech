"use client";

import { Skeleton } from "@chakra-ui/react";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserWithOptionalProfile } from "@/shared/types/profile";

export const AppGuard = (props: {
  children: React.ReactNode;
}): React.ReactNode => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <Skeleton width={"100vw"} height={"100vh"} />;
  }

  if (session.status === "unauthenticated") {
    router.push("/auth/sign-in");
    return null;
  }

  const user = session.data?.user as UserWithOptionalProfile;

  if (user && !user.profile) {
    router.push("/profile-setup");
    return null;
  }

  return <>{props.children}</>;
};
