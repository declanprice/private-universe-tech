import { Flex, Heading } from "@chakra-ui/react";

import { UnauthGuard } from "@/shared/guards/UnauthGuard";
import { SignUpForm } from "@/app/auth/components/SignUpForm";

export default function SignUpPage() {
  return (
    <UnauthGuard>
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
    </UnauthGuard>
  );
}
