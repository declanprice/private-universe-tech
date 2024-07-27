"use client";

import { Flex } from "@chakra-ui/react";
import { Toolbar } from "@/shared/components/app-layout/Toolbar";
import { NavBar } from "@/shared/components/app-layout/NavBar";
import { PropsWithChildren, useState } from "react";

export const AppLayout = (props: PropsWithChildren) => {
  const [isNavBarOpen, setIsNavBarOpen] = useState<boolean>(true);

  return (
    <Flex direction={"column"} height={"inherit"} overflow={"hidden"}>
      <Toolbar onOpenNavBar={() => setIsNavBarOpen(true)} />

      <Flex height={"inherit"}>
        <NavBar
          isNavBarOpen={isNavBarOpen}
          onNavBarClose={() => setIsNavBarOpen(false)}
        />

        {props.children}
      </Flex>
    </Flex>
  );
};
