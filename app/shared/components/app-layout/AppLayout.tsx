"use client";

import { Flex } from "@chakra-ui/react";
import { Toolbar } from "@/shared/components/app-layout/Toolbar";
import { NavBar } from "@/shared/components/app-layout/NavBar";
import React, { useState } from "react";
import { AppGuard } from "@/shared/guards/AppGuard";

export const AppLayout = (props: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [isNavBarOpen, setIsNavBarOpen] = useState<boolean>(false);

  return (
    <AppGuard>
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
    </AppGuard>
  );
};
