// import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

type CodeConversionMsg = {
  codeFormatted: string;
};

export async function GET(
  req: NextRequest,
  // res: NextApiResponse<CodeConversionMsg>, // https://stackoverflow.com/questions/76743001/how-to-send-a-json-response-from-an-api-route-in-next-js
  {
    params,
    // searchParams,
  }: {
    params: { testPathName: string };
    // searchParams: NextRequest['nextUrl']['searchParams'];
  }
): Promise<NextResponse<CodeConversionMsg>> {
  //   const fetchData = await fetch('https://data.mongodb-api.com/...', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'API-Key': process.env.DATA_API_KEY,
  //     },
  //   } as RequestInit);
  //   const data = (await fetchData.json()) as string;
  //
  //   // return Response.json({ data });
  //   return NextResponse.json({ data });

  console.log('testPathName');
  // console.log(req);
  console.log('params', params);
  console.log('req.nextUrl.searchParams', req.nextUrl.searchParams); // https://stackoverflow.com/questions/70272983/how-do-i-get-query-string-params-in-nextjs-middleware
  // console.log('searchParams', searchParams);
  return NextResponse.json({ codeFormatted: 'Some code.' });
}
