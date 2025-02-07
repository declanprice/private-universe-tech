export type Profile = {
  email: string;
  username: string;
  jobTitle: string;
};

export type UserWithProfile = {
  id: string;
  email: string;
  profile: Profile;
};

export type UserWithOptionalProfile = {
  id: string;
  email: string;
  profile?: Profile;
};
