import { NextRequest, NextResponse } from 'next/server';
import { ProgramLang, RemoveCodeCommentSender } from '../../RemoveCodeCommentSender';
import { FetchResponseException } from '@/exception/fetchApi/FetchResponseException';
import { CategorySrcCodeBelongsTo, ErrorBelongWrapper } from '@/exception/general/ErrorBelongWrapper';

type CodeConversionInputMsg = {
  pglang: ProgramLang;
  codeInput: string;
};
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

type CodeConversionOutputMsg = {
  codeOutput: string | undefined;
  errorMsg?: string;
};

export async function GET(
  req: NextRequest
  // { params }: { params: { testPathName: string } }
): Promise<NextResponse<CodeConversionOutputMsg>> {
  const pgLang_querystr = req.nextUrl.searchParams.get('pglang');
  if (pgLang_querystr == null) throw new TypeError();
  const codeInput_querystr = req.nextUrl.searchParams.get('codeInput');
  if (codeInput_querystr == null) throw new TypeError();
  // const pgLang = ProgramLang[pgLang_querystr]; // ~~~// aga the support of enum in TypeScript is soooo unsafe ....

  try {
    const codeOutput = await RemoveCodeCommentSender.removeCodeComment(codeInput_querystr, pgLang_querystr as ProgramLang);
    return NextResponse.json({ codeOutput });
  } catch (error) {
    if (!(error instanceof ErrorBelongWrapper)) throw error;
    if (error.categorySrcCodeBelongsTo === CategorySrcCodeBelongsTo.fetchApi) {
      if (error.errorWrapped instanceof FetchResponseException) {
        return NextResponse.json({ codeOutput: undefined, errorMsg: await error.errorWrapped.fetchResponse.text() });
      } else if (error.errorWrapped instanceof TypeError) {
        return NextResponse.json({ codeOutput: undefined, errorMsg: error.errorWrapped.message });
      }
    }
    throw error.errorWrapped;
  }
}
