"use client";

import { Button, Flex, useToast } from "@chakra-ui/react";
import { FormTextInput } from "@/shared/components/form/FormTextInput";
import { useForm } from "react-hook-form";

export const SignUpForm = () => {
  const toast = useToast();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUp = async (data: any) => {
    const result = await fetch("/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const body = await result.json();

    if (result.status === 200) {
      toast({
        title: "Account created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: body.message ? body.message : "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(signUp)}>
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
          Sign Up
        </Button>
      </Flex>
    </form>
  );
};
