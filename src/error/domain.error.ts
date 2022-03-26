export class DomainError extends Error {
  constructor(message?: string) {
    super(message);

    super.name = "Domain Error";
  }
}
