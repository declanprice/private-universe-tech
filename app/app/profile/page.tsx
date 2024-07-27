"use client";

import {
  Avatar,
  Divider,
  Flex,
  Heading,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { Profile, UserWithProfile } from "@/shared/types/profile";
import { useSession } from "next-auth/react";
import { ProfileForm } from "@/app/profile/components/ProfileForm";

export default function ProfilePage() {
  const toast = useToast();
  const session = useSession();
  const user = session.data?.user as UserWithProfile;

  const onUpdateProfile = async (profile: Profile) => {
    const result = await fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify(profile),
    });

    const body = await result.json();

    if (result.status === 200) {
      await session.update({
        profile: body,
      });

      toast({
        title: "Profile updated",
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

  if (!user) return <Spinner />;

  return (
    <Flex direction={"column"} width={"100%"} gap={4}>
      <Avatar size={"2xl"} name={user.email} />

      <Heading>{user.email}</Heading>

      <Divider />

      <ProfileForm profile={user.profile} onSubmit={onUpdateProfile} />
    </Flex>
  );
}
