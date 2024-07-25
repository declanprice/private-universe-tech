import { object, string } from "valibot";

export const signUpSchema = object({
  email: string(),
  password: string(),
});
