import { parse } from 'url';
import express from 'express';
import next from 'next';
// const { parse } = require('url');
// const express = require('express');
// const next = require('next');
// ~~~//dk module, mjs works dk why 

import bodyParser from 'body-parser';

// import Loki from 'lokijs';
// const Loki = require('lokijs')
// const init = require('./indexModule.ts'); // @messy
import { tabUser, init } from './indexModule.mjs';

const port_listen = 3000;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const bodyParserJson = bodyParser.json();

async function main() {
  init();

  console.log('>> register expressjs');
  try {
    await app.prepare();
    const handle = app.getRequestHandler();
    const expressjs = express();

    expressjs.get('/about', (req, res) => {
      const { query } = parse(req.url, true);
      app.render(req, res, '/about', query);
    });
    expressjs.get('/expressjs/greet', (req, res) => {
      console.log(req.query);
      res.json({ name: req.query?.name ?? 'unknown' });
    });

    // []
    // express.bodyParser() is no longer bundled as part of express. You need to install it separately before loading:
    // <>
    // https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
    // ~~~//dk express
    expressjs.post('/findUser', bodyParserJson, (req, res) => {
    // ;repeat [use post for body]; expressjs.get('/findUser', bodyParserJson, (req, res) => {
      console.log(JSON.stringify(req.body));
      // ;dk [no parse need]; const user = tabUser.findOne({ username: JSON.parse(req.body).username });
      const user = tabUser.findOne({ username: req.body.username });
      res.json(user);
    });
    expressjs.post('/putUser', bodyParserJson, (req, res) => {
      const user = tabUser.insert({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      res.json(user);
    });

    expressjs.get(/_next\/.+/, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });
    expressjs.get('*', (req, res) => {
      // const url = parse(req.url, true);
      console.log(req.url);
      handle(req, res);
    });
    // ;main; []
    // ;main;   // ↓↓↓ add route for post method
    // ;main;   app.post('*', (req, res) => {
    // ;main;     return handle(req, res);
    // ;main;   });
    // ;main; <>
    // ;main; https://github.com/nextauthjs/next-auth/issues/642
    // expressjs.post('/api/auth/*', (req, res) => {
    expressjs.post('*', (req, res) => {
      handle(req, res);
    });
    expressjs.listen(port_listen, () => console.log('expressjs ready'));
  } catch (err) {
    // console.log((err as Error).stack);
    console.log(err.stack);
  }
}
main();

// []
// "scripts": {
//     "dev": "node server",
//  },
// <>
// https://medium.com/@obulareddyveera/next-js-invite-express-js-as-middleware-ea5e7bb494f0
//
// ~~~// suspecting cuz that inside the file saw main  in Tx but didnt say
