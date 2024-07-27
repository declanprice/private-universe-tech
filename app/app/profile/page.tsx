"use client";

import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Profile } from "@/shared/types/profile";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const toast = useToast();
  const router = useRouter();
  const session = useSession();

  console.log(session);

  const onUpdate = async (profile: Profile) => {
    const result = await fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify(profile),
    });

    const body = await result.json();

    if (result.status === 200) {
      await session.update({
        profile: body.profile,
      });

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

  return <main>view profile</main>;
}
