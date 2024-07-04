import Koa from "koa";
import cors from "@koa/cors";
import { koaBody } from "koa-body";
import bodyParser from "koa-bodyparser";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Router from "@koa/router";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = new Koa();

const router = new Router();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/hello', async ctx => {
  const { what } = ctx.query;

  ctx.body = {
    message: `Hello ${what || 'World'}`
  };
  ctx.status = 200;
});


app.listen(8081);

console.log('Running Koa App on port 8081...');

export default app;
