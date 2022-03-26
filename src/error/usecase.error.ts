export class UsecaseError extends Error {
  constructor(message?: string) {
    super(message);

    super.name = "Usecase Error";
  }
}
