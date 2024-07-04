import Router from "@koa/router";
import multer from "@koa/multer"
import { storeData } from "../db/data.js";
import { readCSVandInsertData } from './util.js';

const SensorRouter = new Router({
  prefix: '/api/sensor'
});

SensorRouter.post('/data', async ctx => {
  //console.log('Save a data to DB');
  try {
    const newData = ctx.request.body;
    if (!newData) {
      ctx.throw(400, 'Invalid data');
    }

    //console.log(newData);
    storeData({ ...newData, isRaw: true });

    ctx.status = 201;
    ctx.body = {
      status: 'success',
      data: newData
    };
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      status: error,
    };
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

SensorRouter.post('/csv', upload.single('file'), async ctx => {
  console.log('POST a CSV file');
  const file = ctx.request?.files?.fileInput;

  if (!file) {
    ctx.status = 400;
    ctx.body = 'No file uploaded.';
    return;
  }
  ctx.body = `File ${file.originalname} uploaded successfully.`;

  const csv = file.filepath;
  console.log('Download the CSV to: ' + csv);
  readCSVandInsertData(csv);
})

export default SensorRouter;
