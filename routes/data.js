import Router from "@koa/router";
import { getLast24hourData, getLast48hourData, getLastWeekData, getLastMonthData } from "../db/data.js";
import { groupByHourAndAvg, groupByDayAndAvg } from './util.js';

const DataRouter = new Router({
  prefix: '/api/data'
});

DataRouter.get('/last24hourAvg', async ctx => {
  try {
    const data = groupByHourAndAvg(await getLast24hourData());
    ctx.body = {
      status: 'success',
      data: data
    }
  } catch (error) {
    console.error('Error:', error);
    ctx.body = {
      status: error,
      data: []
    }
    throw error;
  }
});

DataRouter.get('/last48hourAvg', async ctx => {
  try {
    const data = groupByHourAndAvg(await getLast48hourData());
    ctx.body = {
      status: 'success',
      data: data
    }
  } catch (error) {
    console.error('Error:', error);
    ctx.body = {
      status: error,
      data: []
    }
    throw error;
  }
});

DataRouter.get('/lastWeekAvg', async ctx => {
  try {
    const data = groupByDayAndAvg(await getLastWeekData());
    ctx.body = {
      status: 'success',
      data: data
    }
  } catch (error) {
    console.error('Error:', error);
    ctx.body = {
      status: error,
      data: []
    }
    throw error;
  }
});

DataRouter.get('/lastMonthAvg', async ctx => {
  try {
    const data = groupByDayAndAvg(await getLastMonthData());
    ctx.body = {
      status: 'success',
      data: data
    }
  } catch (error) {
    console.error('Error:', error);
    ctx.body = {
      status: error,
      data: []
    }
    throw error;
  }
});

export default DataRouter;