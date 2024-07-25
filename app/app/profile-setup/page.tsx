"use client";

import { Profile, ProfileSetupModal } from "./components/ProfileSetupModal";

export default function ProfileSetupPage() {
  const onProfileSubmit = async (profile: Profile) => {
    console.log("profile", profile);
  };

  return <ProfileSetupModal profile={{}} onSubmit={onProfileSubmit} />;
}
