import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';

// ;; export async function middleware(req: NextRequest, _next: NextFetchEvent) {
// ;;   console.log(req);
// ;;   console.log(_next);
// ;;   console.log(typeof _next);
// ;;
// ;;   const next1: NextMiddlewareResult = await middleware1(req, _next);
// ;;   // seems no more respond & just directly modify on the req multiple times? ...
// ;;   // dk the diff and limitation of middleware in nextjs compare to expressjs
// ;; }
// ;;
// ;; // []
// ;; //   const response = NextResponse.next()
// ;; // <>
// ;; // https://nextjs.org/docs/app/building-your-application/routing/middleware
// ;; // ~~~// ok that is automatic passing
// ;; // // aga doc no_comfirm , always have to guess on the correctness of usage/syntax [[or waste time to search & life  bbbbb
// ;;
// ;; // ;@main; []
// ;; // ;@main; export default withLogging(withHeaders(defaultMiddleware))
// ;; // ;@main; <>
// ;; // ;@main; https://reacthustle.com/blog/how-to-chain-multiple-middleware-functions-in-nextjs
// ;;
// ;; const middleware1: NextMiddleware = (req, _next) => {
// ;;   console.log('111');
// ;; };
// ;; const middleware2: NextMiddleware = (req, _next) => {
// ;;   console.log('222');
// ;; };

export async function middleware(req: NextRequest, _next: NextFetchEvent) {
  // console.log(req);
}

// test overwrite