"use client";

import { Flex, Skeleton } from "@chakra-ui/react";
import { Toolbar } from "@/shared/components/app-layout/Toolbar";
import { NavBar } from "@/shared/components/app-layout/NavBar";
import { PropsWithChildren, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserWithOptionalProfile } from "@/shared/types/profile";

export const AppLayout = (props: PropsWithChildren) => {
  const session = useSession();
  const router = useRouter();
  const [isNavBarOpen, setIsNavBarOpen] = useState<boolean>(false);

  // normally i would extract app guarding logic into a route guard / middleware.
  if (session.status === "loading") {
    return <Skeleton width={"100vw"} height={"100vh"} />;
  }

  if (session.status === "unauthenticated") {
    return router.push("/auth/sign-in");
  }

  const user = session.data?.user as UserWithOptionalProfile;

  if (user && !user.profile) {
    return router.push("/profile-setup");
  }

  return (
    <main>
      <Flex direction={"column"} height={"inherit"} overflow={"hidden"}>
        <Toolbar onOpenNavBar={() => setIsNavBarOpen(true)} />

        <Flex height={"inherit"} width={"1200px"} m={"0 auto"} p={4}>
          <NavBar
            isNavBarOpen={isNavBarOpen}
            onNavBarClose={() => setIsNavBarOpen(false)}
          />

          {props.children}
        </Flex>
      </Flex>
    </main>
  );
};
