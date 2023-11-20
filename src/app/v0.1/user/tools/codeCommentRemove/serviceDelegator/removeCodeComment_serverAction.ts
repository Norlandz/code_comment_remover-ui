'use server';

import { FetchResponseException } from '@/exception/fetchApi/FetchResponseException';
import { UnsupportedProgrammingLanguageException } from '../exception/UnsupportedProgrammingLanguageException';
import { EmptyContentException } from '../../../../../../exception/general/EmptyContentException';
import { FetchApiErrorWrapper } from '@/exception/fetchApi/FetchNetworkErrorWrapper';
import { CodeConversionInputMsg, CodeConversionOutputMsg } from '../msgSchema/CodeConversionMsgSchema';
import { RemoveCodeCommentSender } from './RemoveCodeCommentSender';

// @dk is it fine to have 'use server' in any small scope mix with other normal function + OOP?
// >"
//   × It is not allowed to define inline "use server" annotated Server Actions in Client Components.
//   │ To use Server Actions in a Client Component, you can either export them from a separate file with "use server" at the top, or pass them down through props from a Server Component.
// ~~~// this is not client_component, detection pb ... dk just move
export async function removeCodeComment_serverAction(codeConversionInputMsg: CodeConversionInputMsg): Promise<CodeConversionOutputMsg> {
  // 'use server';
  // TODO rather to have smaller scope of 'use server' & in other file with other export
  
  try {
    const { codeOutput } = await RemoveCodeCommentSender.removeCodeComment(codeConversionInputMsg);
    return { codeOutput };
  } catch (error) {
    if (error instanceof UnsupportedProgrammingLanguageException) {
      return { codeOutput: undefined, errorName: UnsupportedProgrammingLanguageException.name, errorMsg: error.message };
    } else if (error instanceof EmptyContentException) {
      return { codeOutput: undefined, errorName: EmptyContentException.name, errorMsg: error.message };
    } else if (error instanceof FetchResponseException) {
      return { codeOutput: undefined, errorName: FetchResponseException.name, errorMsg: error.message };
    } else if (error instanceof FetchApiErrorWrapper) {
      return {
        codeOutput: undefined,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        errorName: error.errorWrapped instanceof Error ? Object.getPrototypeOf(error.errorWrapped).constructor.name : '',
        errorMsg: error.errorWrapped instanceof Error ? error.errorWrapped.message : typeof error.errorWrapped === 'string' ? error.errorWrapped : 'unknown FetchError',
      };
    } else {
      throw error;
    }
  }
}
