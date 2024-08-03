"use client";

import { Flex, Heading } from "@chakra-ui/react";
import { SignInForm } from "../components/SignInForm";
import { AuthRoutesGuard } from "@/shared/guards/AuthRoutesGuard";

export default function SignInPage() {
  return (
    <AuthRoutesGuard>
      <main>
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
      </main>
    </AuthRoutesGuard>
  );
}
