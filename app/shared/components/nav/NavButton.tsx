"use client";

import { Button, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";

type NavButtonProps = {
  icon: any;
  label: string;
  to: string;
  rightIcon?: any;
};

export const NavButton = (props: NavButtonProps) => {
  const { rightIcon } = props;

  const router = useRouter();

  const pathname = usePathname();

  const { icon, label, to } = props;

  const isActive = pathname === to;

  return (
    <Button
      key={props.label}
      variant={"ghost"}
      colorScheme={"gray"}
      alignItems={"center"}
      display={"flex"}
      fontWeight={"regular"}
      justifyContent={"flex-start"}
      isActive={isActive}
      rightIcon={rightIcon}
      _active={{
        backgroundColor: "gray.200",
      }}
      gap={2}
      width={"100%"}
      onClick={() => {
        router.push(to);
      }}
      leftIcon={icon}
    >
      <Text color={"gray.900"} fontWeight={"300"} flex={1} textAlign={"start"}>
        {label}
      </Text>
    </Button>
  );
};
