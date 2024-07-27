import { Profile } from "@/shared/types/profile";
import { useForm } from "react-hook-form";
import { FormTextInput } from "@/shared/components/form/FormTextInput";
import { Button, Flex } from "@chakra-ui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { profileSchema } from "@/shared/schemas/profile.schema";
import React from "react";

type ProfileFormProps = {
  profile: Profile;
  onSubmit: (profile: Profile) => any;
};

export const ProfileForm = (props: ProfileFormProps) => {
  const { profile, onSubmit } = props;

  const form = useForm<Profile>({
    defaultValues: {
      username: profile.username,
      jobTitle: profile.jobTitle,
    },
    resolver: valibotResolver(profileSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Flex direction={"column"} gap={4}>
        <FormTextInput
          label={"Username"}
          name={"username"}
          control={form.control}
        />

        <FormTextInput
          label={"Job Title"}
          name={"jobTitle"}
          control={form.control}
        />

        <Button
          type={"submit"}
          isLoading={form.formState.isSubmitting}
          ml={"auto"}
        >
          Save
        </Button>
      </Flex>
    </form>
  );
};
