// interface ResponseEncapsulated / extends Response { // dont extends if need encapsulate ...
export class ResponseEncapsulated {
  constructor(
    //
    public readonly errorName?: string,
    public readonly errorMsg?: string,
    public readonly httpStatusCode?: number
  ) {}
}

/**
 * need encapsulate smaller
 */
export class FetchResponseException extends Error {
  // readonly fetchResponse: Response;
  readonly fetchResponseEncapsulated: ResponseEncapsulated;

  constructor(fetchResponseEncapsulated: ResponseEncapsulated) {
    super('FetchResponseException > ' + fetchResponseEncapsulated.errorName + ' > -- ' + fetchResponseEncapsulated.httpStatusCode + '\n' + fetchResponseEncapsulated.errorMsg);
    this.name = this.constructor.name;
    this.fetchResponseEncapsulated = fetchResponseEncapsulated;
  }
}
