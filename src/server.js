import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const rewriteUrl = () => {
  return (req, res, next) => {
    if (req.url === "/about2") {
      req.url = req.originalUrl = `/about`;
      next("route");
    } else {
      next();
    }
  };
};


express()
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		rewriteUrl(),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
