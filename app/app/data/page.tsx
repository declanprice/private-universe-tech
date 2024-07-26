"use client";

import useSWR from "swr";
import { Spinner } from "@chakra-ui/react";
import { ProfileDetails } from "./components/ProfileDetails";
import { Profile } from "@/shared/types/profile";

export default function DataPage() {
  const { data, isLoading } = useSWR<Profile>("/api/profile");

  if (!data || isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <ProfileDetails profile={data} />;
    </>
  );
}
