import { FetchResponseException, ResponseEncapsulated } from '@/exception/fetchApi/FetchResponseException';
import { UnsupportedProgrammingLanguageException } from '../exception/UnsupportedProgrammingLanguageException';
import { EmptyContentException } from '../../../../../../exception/general/EmptyContentException';
import { FetchApiErrorWrapper } from '@/exception/fetchApi/FetchNetworkErrorWrapper';
import { ProgramLang } from '../enum/ProgramLang';
import { NextResponse } from 'next/server';
import { CodeConversionInputMsg, CodeConversionOutputMsg, typeguard_unsafe_CodeConversionOutputMsg, typeguard_unsafe_FastifyHttpErrorMsg } from '../msgSchema/CodeConversionMsgSchema';

// @que: does 'use server' cope with OOP? ..
// >"
// page.tsx:203 Uncaught (in promise) Error: A "use server" file can only export async functions, found object.
// guess not then

export class RemoveCodeCommentSender {
  private static readonly ip = '127.0.0.1'; // 'localhost';
  private static readonly url_ts_removeCodeComment = `http://${this.ip}:14080/v1/remove_Comment_inGiven_FileCode`;
  private static readonly url_java_removeCodeComment = `http://${this.ip}:18082/v0.1/removeCodeCommentGivenFileCode`;

  // @main:
  public static async removeCodeComment(codeConversionInputMsg: CodeConversionInputMsg): Promise<CodeConversionOutputMsg> {
    let url = null;
    if (codeConversionInputMsg.pglang === ProgramLang.Typescript) {
      url = this.url_ts_removeCodeComment;
    } else if (codeConversionInputMsg.pglang === ProgramLang.Java) {
      url = this.url_java_removeCodeComment;
    } else {
      throw new UnsupportedProgrammingLanguageException(codeConversionInputMsg.pglang);
    }

    if (codeConversionInputMsg.codeInput == null) throw new TypeError();
    if (/^\s*$/g.test(codeConversionInputMsg.codeInput)) throw new EmptyContentException('Empty / only whitespace content in code');

    // ;[fetch error handle];archived; try {@¦    // ;[fetch error handle];archived;   const fetchResponse = await fetch(url, {@¦    // ;[fetch error handle];archived;     method: 'POST',@¦    // ;[fetch error handle];archived;     headers: {@¦    // ;[fetch error handle];archived;       Accept: 'application/json,*/*;q=0.0',@¦    // ;[fetch error handle];archived;       'Content-Type': 'text/plain',@¦    // ;[fetch error handle];archived;       // 'Content-type': 'application/json',@¦    // ;[fetch error handle];archived;     },@¦    // ;[fetch error handle];archived;     body: code_input, // JSON.stringify(code_input),@¦    // ;[fetch error handle];archived;   });@¦    // ;[fetch error handle];archived;   // []@¦    // ;[fetch error handle];archived;   // Fetch detects only network errors. Other errors (401, 400, 500) should be manually caught and rejected.@¦    // ;[fetch error handle];archived;   // <>@¦    // ;[fetch error handle];archived;   // https://stackoverflow.com/questions/54163952/async-await-in-fetch-how-to-handle-errors@¦    // ;[fetch error handle];archived;   if (fetchResponse.status >= 400 && fetchResponse.status < 600) throw new FetchResponseException(fetchResponse);@¦    // ;[fetch error handle];archived;   // TODOX forget what I return ....@¦    // ;[fetch error handle];archived;   return fetchResponse.text(); // aga 1. auto convert 1. error handle..@¦    // ;[fetch error handle];archived;   // []@¦    // ;[fetch error handle];archived;   // The **`text()`** method of the [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) interface takes a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) stream and reads it to completion. It returns a promise that resolves with a [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String). The response is *always* decoded using UTF-8.@¦    // ;[fetch error handle];archived;   // <>@¦    // ;[fetch error handle];archived;   // https://developer.mozilla.org/en-US/docs/Web/API/Response/text@¦    // ;[fetch error handle];archived; } catch (error) {@¦    // ;[fetch error handle];archived;   throw new ErrorBelongWrapper(CategorySrcCodeBelongsTo.fetchApi, error);@¦    // ;[fetch error handle];archived; }@¦    // ;[fetch error handle]//@¦    // ;[fetch error handle];archived;   export async function GET(@¦    // ;[fetch error handle];archived;     req: NextRequest@¦    // ;[fetch error handle];archived;     // { params }: { params: { testPathName: string } }@¦    // ;[fetch error handle];archived;   ): Promise<NextResponse<CodeConversionOutputMsg>> {@¦    // ;[fetch error handle];archived;     const pgLang_querystr = req.nextUrl.searchParams.get('pglang');@¦    // ;[fetch error handle];archived;     if (pgLang_querystr == null) throw new TypeError();@¦    // ;[fetch error handle];archived;     const codeInput_querystr = req.nextUrl.searchParams.get('codeInput');@¦    // ;[fetch error handle];archived;     if (codeInput_querystr == null) throw new TypeError();@¦    // ;[fetch error handle];archived;     // const pgLang = ProgramLang[pgLang_querystr]; // ~~~// aga the support of enum in TypeScript is soooo unsafe ....@¦    // ;[fetch error handle];archived;  try {@¦    // ;[fetch error handle];archived;    const codeOutput = await RemoveCodeCommentSender.removeCodeComment(codeInput_querystr, pgLang_querystr as ProgramLang);@¦    // ;[fetch error handle];archived;    return NextResponse.json({ codeOutput });@¦    // ;[fetch error handle];archived;  } catch (error) {@¦    // ;[fetch error handle];archived;    if (!(error instanceof ErrorBelongWrapper)) throw error;@¦    // ;[fetch error handle];archived;    if (error.categorySrcCodeBelongsTo === CategorySrcCodeBelongsTo.fetchApi) {@¦    // ;[fetch error handle];archived;      if (error.errorWrapped instanceof FetchResponseException) {@¦    // ;[fetch error handle];archived;        return NextResponse.json({ codeOutput: undefined, errorMsg: await error.errorWrapped.fetchResponse.text() });@¦    // ;[fetch error handle];archived;      } else if (error.errorWrapped instanceof TypeError) {@¦    // ;[fetch error handle];archived;        return NextResponse.json({ codeOutput: undefined, errorMsg: error.errorWrapped.message });@¦    // ;[fetch error handle];archived;      }@¦    // ;[fetch error handle];archived;    }@¦    // ;[fetch error handle];archived;    throw error.errorWrapped;@¦    // ;[fetch error handle];archived;  }@¦    // ;[fetch error handle]//@¦    // ;[fetch error handle];archived;          try {@¦    // ;[fetch error handle];archived;            // @main:@¦    // ;[fetch error handle];archived;            const codeOutput = await RemoveCodeCommentSender.removeCodeComment(codeInput_rst, programLang_rst);@¦    // ;[fetch error handle];archived;            codeOutput_setRst(codeOutput);@¦    // ;[fetch error handle];archived;            dispatch_resultState({@¦    // ;[fetch error handle];archived;              time: dayjs().format('HH:mm:ss.SSS'),@¦    // ;[fetch error handle];archived;              resultState: 'done',@¦    // ;[fetch error handle];archived;            });@¦    // ;[fetch error handle];archived;          } catch (error) {@¦    // ;[fetch error handle];archived;            if (error instanceof ErrorBelongWrapper) {@¦    // ;[fetch error handle];archived;              if (error.categorySrcCodeBelongsTo === CategorySrcCodeBelongsTo.fetchApi) {@¦    // ;[fetch error handle];archived;                if (error.errorWrapped instanceof FetchResponseException) {@¦    // ;[fetch error handle];archived;                  codeOutput_setRst(await error.errorWrapped.fetchResponse.text());@¦    // ;[fetch error handle];archived;                  dispatch_resultState({@¦    // ;[fetch error handle];archived;                    time: dayjs().format('HH:mm:ss.SSS'),@¦    // ;[fetch error handle];archived;                    resultState: FetchResponseException.name,@¦    // ;[fetch error handle];archived;                  });@¦    // ;[fetch error handle];archived;                } else if (error.errorWrapped instanceof TypeError) {@¦    // ;[fetch error handle];archived;                  codeOutput_setRst(error.errorWrapped.message); // JSON.stringify(error.errorWrapped, null, 2)); doesnt shows@¦    // ;[fetch error handle];archived;                  dispatch_resultState({@¦    // ;[fetch error handle];archived;                    time: dayjs().format('HH:mm:ss.SSS'),@¦    // ;[fetch error handle];archived;                    resultState: TypeError.name,@¦    // ;[fetch error handle];archived;                  });@¦    // ;[fetch error handle];archived;                } else {@¦    // ;[fetch error handle];archived;                  throw error.errorWrapped;@¦    // ;[fetch error handle];archived;                }@¦    // ;[fetch error handle];archived;              } else {@¦    // ;[fetch error handle];archived;                throw error.errorWrapped;@¦    // ;[fetch error handle];archived;              }@¦    // ;[fetch error handle];archived;            } else {@¦    // ;[fetch error handle];archived;              throw error;@¦    // ;[fetch error handle];archived;            }@¦    // ;[fetch error handle];archived;          }@¦    // ;[fetch error handle];archived;          // the use of finally & the throw ......

    // should handle things at the bottom level first contact / delegate up ?;
    // aga feels the Error design in js / fetch is bad ... so generic ;  // should i wrap into a better wrapper (if throw up)?
    let fetchResponse_preFinal;
    try {
      fetchResponse_preFinal = await fetch(url, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'text/plain',
          'Content-type': 'application/json',
          Accept: 'application/json,*/*;q=0.0',
        },
        body: JSON.stringify(codeConversionInputMsg),
      });
    } catch (error) {
      throw new FetchApiErrorWrapper('err from RemoveCodeCommentSender.removeCodeComment', error);
    }
    const fetchResponse = fetchResponse_preFinal;

    // []
    // Fetch detects only network errors. Other errors (401, 400, 500) should be manually caught and rejected.
    // <>
    // https://stackoverflow.com/questions/54163952/async-await-in-fetch-how-to-handle-errors
    // if (fetchResponse.status >= 400 && fetchResponse.status < 600) throw new FetchResponseException('err from RemoveCodeCommentSender.removeCodeComment', fetchResponse);
    const contentType = fetchResponse.headers.get('content-type');

    // @note: debug server_side need do in package.json ; client_side need attach chrome url
    // TODO @pb: distinguish auto gen error & manual error with body schema
    //no_knowlres ?... logic guess will be check for property one by one -- cuz only json str info is passed, unless other info / schema for detection ...
    // FIXMEX aga dk schema check no_knowlres; also this typeguard is very unsafe

    // []
    // The **`text()`** method of the [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) interface takes a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) stream and reads it to completion. It returns a promise that resolves with a [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String). The response is *always* decoded using UTF-8.
    // <>
    // https://developer.mozilla.org/en-US/docs/Web/API/Response/text
    // @need_check forget what I return ....  // aga 1. auto convert 1. error handle..
    // return await fetchResponse.text();

    // @: better not mix the msg schema ? ...
    // TODOV fix the return error msg in json

    // Reply: { body: { codeOutput: string } };
    // @design: normally json response do have a body .. but that kinda nested in those . dk

    async function getResponseBodyJsonOrText() {
      if (contentType == null) throw new TypeError();

      let responseBody_JsonOrText;

      // https://stackoverflow.com/questions/37121301/how-to-check-if-the-response-of-a-fetch-is-a-json-object-in-javascript
      if (contentType.includes('application/json')) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          responseBody_JsonOrText = await fetchResponse.json();
        } catch (error) {
          // no need try catch, just throw // fine add some msg ... // indeed the server return wrong (-- cuz didnt build the code, copied old jar) 

          let text;
          try {
            text = await fetchResponse.text();
          } catch (error) {
            text = undefined;
          }

          console.error(
            JSON.stringify({
              msg: `contentType.includes('application/json') > responseBody_JsonOrText = await fetchResponse.json(); > catch error`,
              fetchResponse_text: text,
              fetchResponse_status: fetchResponse.status,
              fetchResponse_statusText: fetchResponse.statusText,
              fetchResponse_headers: fetchResponse.headers,
              fetchResponse_type: fetchResponse.type,
              fetchResponse_url: fetchResponse.url,
            })
          );
          
          responseBody_JsonOrText = undefined;
        }
      } else {
        try {
          // @?? body is unusable -- dk why this cannot catch the insdie of `await fetchResponse.text()` , this just get propagated out ...
          // feels this is sth about stream -- some promise inside throws ; I cannot catch that outside (//where_talked? .. )
          // @que: is this the proper way to check text inside? or just cuz the server crashed so not this? (for json vs text see StackOverflow)
          responseBody_JsonOrText = await fetchResponse.text();
        } catch (error) {
          responseBody_JsonOrText = undefined;
        }
      }
      return responseBody_JsonOrText;
    }

    if (fetchResponse.status >= 200 && fetchResponse.status < 300) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const responseBody_JsonOrText = await getResponseBodyJsonOrText();
      if (typeguard_unsafe_CodeConversionOutputMsg(responseBody_JsonOrText)) {
        return responseBody_JsonOrText;
      } else {
        throw new TypeError();
      }
    } else if (fetchResponse.status >= 300 && fetchResponse.status < 400) {
      throw new TypeError('//TODO');
    } else if (fetchResponse.status >= 400 && fetchResponse.status < 600) {
      // @think: also is null json type, rt error handling pb, should i return that..
      // say can be server es fault, not always client ..
      if (fetchResponse.status === 415) {
        throw new FetchResponseException(new ResponseEncapsulated('415 Unsupported Media Type', undefined, fetchResponse.status));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const responseBody_JsonOrText = await getResponseBodyJsonOrText();
        if (typeguard_unsafe_CodeConversionOutputMsg(responseBody_JsonOrText)) {
          throw new FetchResponseException(new ResponseEncapsulated(responseBody_JsonOrText.errorName, responseBody_JsonOrText.errorMsg, fetchResponse.status));
        } else if (typeguard_unsafe_FastifyHttpErrorMsg(responseBody_JsonOrText)) {
          throw new FetchResponseException(new ResponseEncapsulated(responseBody_JsonOrText.error, responseBody_JsonOrText.message, fetchResponse.status));
        } else if (responseBody_JsonOrText === undefined) {
          throw new FetchResponseException(new ResponseEncapsulated(undefined, undefined, fetchResponse.status));
        } else {
          throw new TypeError();
        }
      }
    } else {
      throw new TypeError();
    }
  }
}

// >"
// Warning: Only plain objects can be passed to Client Components from Server Components. Response objects are not supported. {: Response}
// so this cannot be _serverActionRespondInFetchApi
export async function removeCodeComment_fetchApi(codeConversionInputMsg: CodeConversionInputMsg): Promise<NextResponse<CodeConversionOutputMsg>> {
  try {
    // @que: when calling Server_Action in Static_Route_Handler / Server_Component -- do Nextjs know there is no need for extra round trip Server call?
    // @think: feels the extra layer is needed ; just each layer has its own communication  // but the pb is this server_side & client_side handle very diff ... // the thought of separate mode;  // cuz the expected result from client_side should be the same as fetch ...  // dk miss ... w // // as for error handling ... // dk consistency & design lost brain
    const { codeOutput } = await RemoveCodeCommentSender.removeCodeComment(codeConversionInputMsg);
    return NextResponse.json({ codeOutput });
  } catch (error) {
    if (error instanceof UnsupportedProgrammingLanguageException) {
      return NextResponse.json({ codeOutput: undefined, errorName: UnsupportedProgrammingLanguageException.name, errorMsg: error.message }, { status: 400 });
    } else if (error instanceof EmptyContentException) {
      return NextResponse.json({ codeOutput: undefined, errorName: EmptyContentException.name, errorMsg: error.message }, { status: 400 });
    } else if (error instanceof FetchResponseException) {
      //       // TODOV need from server to know 400 or 500 -- this abstraction....
      //       // @design[think]: maybe need try catch all Exception & return to client?
      //       // @design[think]: 1. is that good design? (how dev know there is a pb)
      //       // @design[think]: 1. what if some exception unable to catch?
      //       // @design[think]: 1. if so, then why not all http has a place for errorMsg to return?
      //       // @design[think]: 1. maybe not need catch all; nginx knows auto return 500 if crash ...
      //
      //       // TODOV @need_check RestApi book do i return 200 or 400 // [[too many que, no brain? // distinguish error message schema when auto gen vs manual gen 500 response
      //       // say dont return 200; also <see [FetchResponseException encapsulation]>, so dont bother with status & body conversion now
      //
      //       // @think: maybe its better not to expose the fetchResponse ?.. but the api do need it.. & if more headers are needed that will need more too ... deps on lv of encapsulation ... // maybe even just directly ruturn the fetchRespond .. just dont care whats inside // cant .. the type restrictied & did thought many modularize seems easiest, dk better
      //       // need encapsulte, can just no tell any thing -- another mechanism communicate & self status code design ; keep throw if need & swallow at controller;
      return NextResponse.json({ codeOutput: undefined, errorName: FetchResponseException.name, errorMsg: error.message }, { status: error.fetchResponseEncapsulated.httpStatusCode });
    } else if (error instanceof FetchApiErrorWrapper) {
      return NextResponse.json(
        {
          codeOutput: undefined,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          errorName: error.errorWrapped instanceof Error ? Object.getPrototypeOf(error.errorWrapped).constructor.name : '',
          errorMsg: error.errorWrapped instanceof Error ? error.errorWrapped.message : typeof error.errorWrapped === 'string' ? error.errorWrapped : 'unknown FetchError',
        },
        { status: 500 }
      );
    } else {
      throw error;
    }
  }
}

/**
 * {@link ./removeCodeComment_serverAction.ts#removeCodeComment_serverAction}
 */
