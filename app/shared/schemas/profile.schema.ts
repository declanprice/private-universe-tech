import { object, string, pipe, minLength } from "valibot";

export const profileSchema = object({
  username: pipe(
    string(),
    minLength(5, "Username must be at least 5 characters."),
  ),
  jobTitle: pipe(
    string(),
    minLength(5, "Job Title must be at least 5 characters."),
  ),
});
