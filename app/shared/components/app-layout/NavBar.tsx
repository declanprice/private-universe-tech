import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import { TiHomeOutline } from "react-icons/ti";
import { BiNetworkChart, BiSolidDog } from "react-icons/bi";
import React from "react";
import { NavButton } from "../nav/NavButton";
import { COLOR } from "@/theme";
import { CgProfile } from "react-icons/cg";

type NavBarProps = {
  isNavBarOpen: boolean;
  onNavBarClose: () => any;
};

export const NavBar = (props: NavBarProps) => {
  const { isNavBarOpen, onNavBarClose } = props;

  return (
    <Drawer isOpen={isNavBarOpen} placement="left" onClose={onNavBarClose}>
      <DrawerOverlay />
      <DrawerContent background={COLOR.lightgray}>
        <DrawerBody>
          <Flex
            width={"100%"}
            direction={"column"}
            overflowY={"auto"}
            flex={1}
            gap={2}
            display={"flex"}
            flexDir={"column"}
            p={2}
          >
            <NavButton
              label={"My Profile"}
              icon={<CgProfile color={"gray.900"} size={18} />}
              to={`/profile`}
            />

            <NavButton
              label={"Dogs"}
              icon={<BiSolidDog color={"gray.900"} size={18} />}
              to={`/dogs`}
            />
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
