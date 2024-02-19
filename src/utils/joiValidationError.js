export default class JoiValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "JoiValidationError";
    this.message = message;
  }
}
