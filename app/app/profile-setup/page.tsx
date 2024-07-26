"use client";

import { ProfileSetupModal } from "./components/ProfileSetupModal";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Profile } from "@/shared/types/profile";

export default function ProfileSetupPage() {
  const toast = useToast();
  const router = useRouter();

  const onProfileSubmit = async (profile: Profile) => {
    const result = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(profile),
    });

    const body = await result.json();

    if (result.status === 200) {
      toast({
        title: "Profile created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push("/data");
    } else {
      toast({
        title: body.message ? body.message : "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return <ProfileSetupModal onSubmit={onProfileSubmit} />;
}
