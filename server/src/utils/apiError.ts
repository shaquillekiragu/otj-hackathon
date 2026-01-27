export class ApiError extends Error {
  statusCode: number;
  metaData?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode = 500,
    metaData?: Record<string, unknown>,
  ) {
    super(message);
    this.statusCode = statusCode;
    if (metaData) {
      this.metaData = metaData;
    }

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
