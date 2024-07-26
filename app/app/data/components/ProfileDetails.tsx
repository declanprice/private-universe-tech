import { Profile } from "@/shared/types/profile";
import { Stack, Text } from "@chakra-ui/react";

type ProfileDetailsProps = {
  profile: Profile;
};

export const ProfileDetails = (props: ProfileDetailsProps) => {
  const { profile } = props;

  return (
    <Stack>
      <Text fontSize={16}>Profile</Text>
      <Text fontSize={14}>Email: {profile.email} </Text>
      <Text fontSize={14}>Username: {profile.username} </Text>
      <Text fontSize={14}>Job Title: {profile.jobTitle} </Text>
    </Stack>
  );
};
