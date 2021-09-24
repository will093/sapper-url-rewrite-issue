import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const rewriteUrl = () => {
  return (req, res, next) => {
		console.log('url', req.url)
    if (req.url === "/") {
      req.url = `/blog`;
      next("route");
    } else {
      next();
    }
  };
};


express() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		rewriteUrl(),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});