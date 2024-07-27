import { email, object, pipe, string } from "valibot";

export const signUpSchema = object({
  email: pipe(string(), email()),
  password: string(),
});
