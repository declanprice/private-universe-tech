import { object, pipe, string, email } from "valibot";

export const signInSchema = object({
  email: pipe(string(), email()),
  password: string(),
});
