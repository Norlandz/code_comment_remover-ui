import { NextRequest, NextResponse } from 'next/server';
import * as RemoveCodeCommentSender from '../../serviceDelegator/RemoveCodeCommentSender';
import { headers } from 'next/headers';
import { CodeConversionInputMsg, CodeConversionOutputMsg, typeguard_unsafe_CodeConversionInputMsg } from '../../msgSchema/CodeConversionMsgSchema';

// TODOV consider 'use server' // both seems work, pb is now more of the [calling inside server_component extra round trip pb]
// @rem // { params }: { params: { testPathName: string } } // req.nextUrl.searchParams.get('codeInput');
export async function POST(req: NextRequest): Promise<NextResponse<CodeConversionOutputMsg | null>> {
  // TODOX did I use typeguard ? or what conversion
  // TODO how do i specify Content-Type in Server ?
  // TODOX better way to process content-type
  // TODOX next .text() .json() ... // mdn thing, now need know more about the stream await // axios fetch auto convert body
  const mpp_header = headers();
  const contentType = mpp_header.get('content-type'); // mpp_header.get('Content-Type') // @confirm: both works
  if (contentType == null) return NextResponse.json({ codeOutput: undefined, errorName: undefined, errorMsg: 'missing content-type header' }, { status: 400 });
  if (!contentType.includes('application/json')) return NextResponse.json(null, { status: 415, statusText: 'Unsupported Media Type' });

  // const pgLang = ProgramLang[pgLang_querystr]; // ~~~// aga the support of enum in TypeScript is soooo unsafe ....
  // ; so must have typeguard, else Api url call is inconsistent as the UI button click // ( just 3 entry think ...
  // ; thats why dont expose other api endpoint .. those miss input schema thing -- dont ('want to) impl aga in the backend server ...
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const codeConversionInputMsg = await req.json();
  if (!typeguard_unsafe_CodeConversionInputMsg(codeConversionInputMsg)) return NextResponse.json({ codeOutput: undefined, errorName: undefined, errorMsg: 'Json Input Type is wrong' }, { status: 400 });
  return await RemoveCodeCommentSender.removeCodeComment_fetchApi(codeConversionInputMsg);
}
