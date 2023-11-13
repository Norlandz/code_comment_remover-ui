export class FetchResponseException extends Error {
  readonly fetchResponse: Response;

  constructor(fetchResponse: Response) {
    super();
    this.name = this.constructor.name;
    this.fetchResponse = fetchResponse;
  }
}
