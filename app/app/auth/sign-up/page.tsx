import { Flex, Heading } from "@chakra-ui/react";

import { SignUpForm } from "../components/SignUpForm";

export default function SignUpPage() {
  return (
    <main>
      <Flex
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
        gap={6}
      >
        <Heading size={"2xl"} fontWeight={"bold"}>
          Sign Up
        </Heading>

        <SignUpForm />
      </Flex>
    </main>
  );
}
