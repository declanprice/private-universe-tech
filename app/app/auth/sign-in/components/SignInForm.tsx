"use client";

import { Button, Flex, useToast } from "@chakra-ui/react";
import { FormTextInput } from "@/shared/components/form/FormTextInput";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

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
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
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

  console.log(session.data);

  return (
    <form onSubmit={form.handleSubmit(submitSignIn)}>
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

        {session.status}

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
