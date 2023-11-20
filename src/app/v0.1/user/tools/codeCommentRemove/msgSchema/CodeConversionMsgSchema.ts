import { ProgramLang } from '../enum/ProgramLang';

// ;; ;; type CodeConversionInputMsgMap = { pglang: string; codeInput: string };
// ;; ;; type CodeConversionInputMsgMap = Map<'pglang' | 'codeInput', string>;
// ;; ;; const queryString = (req.nextUrl.searchParams as unknown as CodeConversionInputMsgMap).get('');
// ;; ;; bad_design .. cant type the URLSearchParams , must string everything
// ;; []
// ;;   for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
// ;; <>
// ;; https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object
// ;;
// ;; ~~~// this screw up the performance ...
// ;; but can use ClassTransformer if needed  // r b, should just go brute force no brainer ; tt

export type CodeConversionInputMsg = {
  codeInput: string;
  pglang: ProgramLang;
};

export type CodeConversionOutputMsg = {
  codeOutput: string | undefined;
  errorName?: string;
  errorMsg?: string;
};

export function typeguard_unsafe_CodeConversionInputMsg(body: any): body is CodeConversionInputMsg {
  if (body == null) return false;

  if (
    !(
      typeof (body as CodeConversionInputMsg).codeInput === 'string' && //
      typeof (body as CodeConversionInputMsg).pglang === 'string'
    )
  ) {
    return false;
  }

  for (const key in body) {
    if (!['codeInput', 'pglang'].includes(key)) {
      return false;
    }
  }

  return true;
}

export function typeguard_unsafe_CodeConversionOutputMsg(body: any): body is CodeConversionOutputMsg {
  if (body == null) return false;

  if (
    !(
      typeof (body as CodeConversionOutputMsg).codeOutput === 'string' ||
      typeof (body as CodeConversionOutputMsg).errorName === 'string' ||
      typeof (body as CodeConversionOutputMsg).errorMsg === 'string'
    )
  ) {
    return false;
  }

  for (const key in body) {
    if (!['codeOutput', 'errorName', 'errorMsg'].includes(key)) {
      return false;
    }
  }

  return true;
}

// aga dk if this is fastify or universal @pb[distinguish auto gen or manual gen error schema]
export type FastifyHttpErrorMsg = {
  error: string;
  message: string;
  statusCode: number;
};

export function typeguard_unsafe_FastifyHttpErrorMsg(body: any): body is FastifyHttpErrorMsg {
  if (body == null) return false;

  if (
    !(
      typeof (body as FastifyHttpErrorMsg).error === 'string' && //
      typeof (body as FastifyHttpErrorMsg).message === 'string' &&
      typeof (body as FastifyHttpErrorMsg).statusCode === 'number'
    )
  ) {
    return false;
  }

  for (const key in body) {
    if (!['error', 'message', 'statusCode'].includes(key)) {
      return false;
    }
  }

  return true;
}
