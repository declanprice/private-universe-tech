"use client";

import { Flex, Heading } from "@chakra-ui/react";
import { SignInForm } from "./components/SignInForm";

export default function SignInPage() {
  return (
    <Flex
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
      gap={6}
    >
      <Heading size={"2xl"} fontWeight={"bold"}>
        Sign In
      </Heading>

      <SignInForm />
    </Flex>
  );
}
