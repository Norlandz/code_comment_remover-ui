export class FetchApiErrorWrapper extends Error {
  readonly errorWrapped: unknown | Error;

  constructor(message: string | undefined, errorWrapped: unknown | Error) {
    super(message);
    this.name = this.constructor.name;
    this.errorWrapped = errorWrapped;
  }
}
