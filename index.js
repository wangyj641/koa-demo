import Koa from "koa";
import cors from "@koa/cors";
import { koaBody } from "koa-body";
import bodyParser from "koa-bodyparser";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { checkAndCreateDir } from "./lib/util.js";
import DataRouter from "./routes/data.js";
import UserRouter from "./routes/user.js";
import SensorRouter from "./routes/sensor.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = new Koa();

app.use(cors());

// create download path for CSV file
const uploadPath = path.join(__dirname, 'uploads');
checkAndCreateDir(uploadPath);

// Support upload files
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: uploadPath,
    keepExtensions: true,
  }
}));

app.use(UserRouter.routes()).use(UserRouter.allowedMethods());
app.use(DataRouter.routes()).use(DataRouter.allowedMethods());
app.use(SensorRouter.routes()).use(SensorRouter.allowedMethods());

app.listen(8081);

console.log('Running Koa App on port 8081...');

export default app;
