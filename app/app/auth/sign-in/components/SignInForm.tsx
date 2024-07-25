"use client";

import { Button, Flex, useToast } from "@chakra-ui/react";
import { FormTextInput } from "@/components/form/FormTextInput";
import { useForm } from "react-hook-form";
import { auth } from "@/auth";
import { red } from "next/dist/lib/picocolors";
import { useSession } from "next-auth/react";

export const SignInForm = () => {
  const toast = useToast();

  const session = useSession();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitSignIn = async (data: any) => {
    const result = await fetch("/api/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
  };

  return (
    <form onSubmit={form.handleSubmit(submitSignIn)}>
      <Flex direction={"column"} width={"400px"} gap={2}>
        <FormTextInput
          isRequired={true}
          placeholder={"Email"}
          name={"email"}
          control={form.control}
        />
        {session.status};
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
      </Flex>
    </form>
  );
};
