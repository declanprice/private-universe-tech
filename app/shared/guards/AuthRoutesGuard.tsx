"use client";

import { Skeleton } from "@chakra-ui/react";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AuthRoutesGuard = (props: {
  children: React.ReactNode;
}): React.ReactNode => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <Skeleton width={"100vw"} height={"100vh"} />;
  }

  if (session.status === "authenticated") {
    router.push("/dogs");
    return null;
  }

  return <>{props.children}</>;
};
