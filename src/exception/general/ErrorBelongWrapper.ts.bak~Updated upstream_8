export class ErrorBelongWrapper extends Error {
  readonly categorySrcCodeBelongsTo: CategorySrcCodeBelongsTo;
  readonly errorWrapped: unknown | Error;

  constructor(categorySrcCodeBelongsTo: CategorySrcCodeBelongsTo, errorWrapped: unknown | Error) {
    super();
    this.name = this.constructor.name;
    this.categorySrcCodeBelongsTo = categorySrcCodeBelongsTo;
    this.errorWrapped = errorWrapped;
  }
}

export enum CategorySrcCodeBelongsTo {
  fetchApi = 'fetchApi',
}