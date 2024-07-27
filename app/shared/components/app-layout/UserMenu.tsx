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
import { signOut, useSession } from "next-auth/react";
import { UserWithProfile } from "@/shared/types/profile";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";

export const UserMenu = () => {
  const session = useSession();
  const router = useRouter();

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

  const onSignOut = async () => {
    await signOut({ callbackUrl: "/auth/sign-in", redirect: true });
  };

  if (!user) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label={"user-menu-button"}
          variant={"ghost"}
          icon={<Avatar size={"sm"} name={user.email} />}
        />
      </PopoverTrigger>

      <PopoverContent width={"220px"} p={2} mr={2} mt={1}>
        <Flex direction={"column"} gap={2}>
          <Text mt={2} ml={2}>
            {user.profile.username}
          </Text>

          <UserMenuButton
            label={"My Profile"}
            icon={<CgProfile />}
            onClick={() => {
              router.push("/profile");
            }}
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
