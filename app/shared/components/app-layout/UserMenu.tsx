"use client";

import {
  Avatar,
  Button,
  Divider,
  Flex,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { PiSignOut } from "react-icons/pi";
import { useSession } from "next-auth/react";
import { UserWithProfile } from "@/shared/types/profile";
import { CgProfile } from "react-icons/cg";

export const UserMenu = () => {
  const session = useSession();

  const user = session.data?.user as UserWithProfile;

  const UserMenuButton = (props: {
    icon: any;
    label: string;
    onClick?: () => void;
  }) => {
    const { icon, label, onClick } = props;

    return (
      <Button
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        gap={2}
        variant={"ghost"}
        onClick={onClick}
        fontWeight={"regular"}
      >
        {icon}

        <Text color={"gray.900"}>{label}</Text>
      </Button>
    );
  };

  const onSignOut = () => {};

  if (!user) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label={"notification"}
          variant={"ghost"}
          icon={<Avatar size={"sm"} name={user.email} />}
        />
      </PopoverTrigger>

      <PopoverContent width={"220px"} p={2} mr={2} mt={1}>
        <Flex direction={"column"} gap={2}>
          <Text mt={2} ml={2}>
            Declan Price
          </Text>

          <UserMenuButton
            label={"My Profile"}
            icon={<CgProfile />}
            onClick={onSignOut}
          />

          <Divider />

          <UserMenuButton
            label={"Sign Out"}
            icon={<PiSignOut />}
            onClick={onSignOut}
          />
        </Flex>
      </PopoverContent>
    </Popover>
  );
};
