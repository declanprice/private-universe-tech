"use client";

import { Button, Flex, useToast } from "@chakra-ui/react";
import { FormTextInput } from "@/shared/components/form/FormTextInput";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { signInSchema } from "@/shared/schemas/sign-in.schema";

export const SignInForm = () => {
  const toast = useToast();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: valibotResolver(signInSchema),
  });

  const onSignIn = async (data: any) => {
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/dogs",
        redirect: true,
      });
    } catch (error) {
      toast({
        title: "Failed to sign in.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSignIn)}>
      <Flex direction={"column"} width={"400px"} gap={2}>
        <FormTextInput
          isRequired={true}
          placeholder={"Email"}
          name={"email"}
          control={form.control}
        />

        <FormTextInput
          isRequired={true}
          placeholder={"Password"}
          name={"password"}
          control={form.control}
        />

        <Button
          ml={"auto"}
          type={"submit"}
          isLoading={form.formState.isSubmitting}
        >
          Sign In
        </Button>

        <Link href={"/auth/sign-up"}>{`I don't have an account yet.`}</Link>
      </Flex>
    </form>
  );
};
