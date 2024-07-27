import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { UserMenu } from "./UserMenu";
import { CiMenuBurger } from "react-icons/ci";
import { COLOR } from "@/theme";

type ToolbarProps = {
  onOpenNavBar: () => any;
};

export const Toolbar = (props: ToolbarProps) => (
  <>
    <Flex
      backgroundColor={"white"}
      borderBottom={"1px solid"}
      borderColor={COLOR.border}
      alignItems={"center"}
      height={"60px"}
      px={2}
    >
      <IconButton
        variant={"ghost"}
        aria-label={"inbox-button"}
        icon={<CiMenuBurger />}
        onClick={props.onOpenNavBar}
      />

      <Flex alignItems={"center"} gap={4} ml={"auto"}>
        <UserMenu />
      </Flex>
    </Flex>
  </>
);
