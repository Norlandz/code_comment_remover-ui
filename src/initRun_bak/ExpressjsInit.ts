import { parse } from 'url';
import express from 'express';
import next from 'next';
// import bodyParser from 'body-parser';
// require('express-async-errors');
import 'express-async-errors';
// express js how to handle async - Google 搜索@¦https://www.google.ca/search?q=express+js+how+to+handle+async+&newwindow=1&sca_esv=575628172&sxsrf=AM9HkKmvcLoLjJ35z2wKDYsDHMi53TGeqA%3A1697997935186&ei=b2Q1ZdLrCqTG0PEPpuC08A0&ved=0ahUKEwiS34Wen4qCAxUkIzQIHSYwDd4Q4dUDCBA&uact=5&oq=express+js+how+to+handle+async+&gs_lp=Egxnd3Mtd2l6LXNlcnAiH2V4cHJlc3MganMgaG93IHRvIGhhbmRsZSBhc3luYyAyBRAhGKABMgUQIRigATIFECEYoAFIrh9Q1QRYpx5wAXgBkAEAmAFyoAHoB6oBBDEwLjK4AQPIAQD4AQH4AQLCAgoQABhHGNYEGLADwgIHEAAYExiABMICBRAAGKIEwgIGEAAYCBge4gMEGAAgQYgGAZAGCg&sclient=gws-wiz-serp@¦@¦javascript - Handling errors in express async middleware - Stack Overflow@¦https://stackoverflow.com/questions/51391080/handling-errors-in-express-async-middleware@¦@¦javascript - what does express-async-handler do? - Stack Overflow@¦https://stackoverflow.com/questions/56973265/what-does-express-async-handler-do@¦@¦node.js - Express JS use async function on requests - Stack Overflow@¦https://stackoverflow.com/questions/51535455/express-js-use-async-function-on-requests@¦@¦Using async/await in Express | Zell Liew@¦https://zellwk.com/blog/async-await-express/#express-async-errors@¦@¦javascript - express.js async router and error handling - Stack Overflow@¦https://stackoverflow.com/questions/55887918/express-js-async-router-and-error-handling

class ExpressjsInit {
  readonly port_listen = 3000;

  readonly dev = process.env.NODE_ENV !== 'production';

  readonly nextjs = next({ dev: this.dev });
  readonly expressjs = express();

  async main() {
    console.log('>> register expressjs');
    await this.nextjs.prepare();
    const handle = this.nextjs.getRequestHandler();

    this.expressjs.get('/about', async (req, res) => {
      const { query } = parse(req.url, true);
      await this.nextjs.render(req, res, '/about', query);
    });
    this.expressjs.get('/expressjs/greet', (req, res) => {
      console.log(req.query);
      res.json({ name: req.query?.name ?? 'unknown' });
    });

    // app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }));
    // app.use(express.urlencoded({ extended: true }));
    // app.use(express.json());
    // app.use(express.static('public'));

    // this.expressjs.post('/findUser', express.json(), (req, res) => {
    //   const user = tabUser.findOne({ username: req.body.username });
    //   res.json(user);
    // });
    // this.expressjs.post('/putUser', express.json(), (req, res) => {
    //   const user = tabUser.insert({
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password,
    //   });
    //   res.json(user);
    // });

    this.expressjs.get(/_next\/.+/, async (req, res) => {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    });
    this.expressjs.get('*', async (req, res) => {
      await handle(req, res);
    });
    this.expressjs.post('*', async (req, res) => {
      await handle(req, res);
    });

    this.expressjs.listen(this.port_listen, () => {
      console.log('expressjs ready');
    });
  }
}

export { ExpressjsInit };
