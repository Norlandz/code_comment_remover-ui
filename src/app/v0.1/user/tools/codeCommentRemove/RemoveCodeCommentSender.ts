import { FetchResponseException } from '@/exception/fetchApi/FetchResponseException';
import { CategorySrcCodeBelongsTo, ErrorBelongWrapper } from '@/exception/general/ErrorBelongWrapper';
import axios from 'axios';

export enum ProgramLang {
  Java = 'Java',
  Typescript = 'Typescript',
}

export class RemoveCodeCommentSender {
  private static ip = '127.0.0.1'; // 'localhost';
  private static url_ts_removeCodeComment = `http://${this.ip}:14080/v1/remove_Comment_inGiven_FileCode`;
  private static url_java_removeCodeComment = `http://${this.ip}:18082/v0.1/removeCodeCommentGivenFileCode`;

  // @main:
  public static async removeCodeComment(code_input: string, programLang: ProgramLang) {
    let url = null;
    if (programLang === ProgramLang.Typescript) {
      url = this.url_ts_removeCodeComment;
    } else if (programLang === ProgramLang.Java) {
      url = this.url_java_removeCodeComment;
    } else {
      throw new TypeError('Unsupported language (case sensitive) :: ' + programLang);
    }

    if (code_input == null) throw new TypeError();
    if (/^\s+$/g.test(code_input)) throw new TypeError('Empty code');

    try {
      const fetchResponse = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json,*/*;q=0.0',
          'Content-Type': 'text/plain',
          // 'Content-type': 'application/json',
        },
        body: code_input, // JSON.stringify(code_input),
      });
      // []
      // Fetch detects only network errors. Other errors (401, 400, 500) should be manually caught and rejected.
      // <>
      // https://stackoverflow.com/questions/54163952/async-await-in-fetch-how-to-handle-errors
      if (fetchResponse.status >= 400 && fetchResponse.status < 600) throw new FetchResponseException(fetchResponse);
      // TODO forget what I return ....
      return fetchResponse.text(); // aga 1. auto convert 1. error handle..
      // []
      // The **`text()`** method of the [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) interface takes a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) stream and reads it to completion. It returns a promise that resolves with a [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String). The response is *always* decoded using UTF-8.
      // <>
      // https://developer.mozilla.org/en-US/docs/Web/API/Response/text
    } catch (error) {
      throw new ErrorBelongWrapper(CategorySrcCodeBelongsTo.fetchApi, error);
    }

  }
}
