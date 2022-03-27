export class InfrastructureError extends Error {
  constructor(message?: string) {
    super(message);

    super.name = "Infrastructure Error";
  }
}
