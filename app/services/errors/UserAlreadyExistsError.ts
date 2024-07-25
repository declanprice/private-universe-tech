export class UserAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`email ${email} is already in use`);
  }
}
