import prisma from "../lib/prisma.js";
import { makeSerializable } from "../lib/util.js";

function getLast24hours() {
    let currentDate = new Date();
    let last24hour = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000));
    return last24hour;
}

function getLast48hours() {
    let currentDate = new Date();
    let last48hour = new Date(currentDate.getTime() - (48 * 60 * 60 * 1000));
    return last48hour;
}

function getLastWeek() {
    let currentDate = new Date();
    let oneWeekAgo = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000));
    return oneWeekAgo;
}

function getLastMonth() {
    let currentDate = new Date();
    // TODO: not all month is 30 days
    let lastMonth = new Date(currentDate.getTime() - (30 * 24 * 60 * 60 * 1000));
    return lastMonth;
}

async function getLast24hourData() {
    const tm = getLast24hours();
    try {
        const data = await prisma.data.findMany({
            where: {
                timestamp: {
                    gt: tm,
                },
            },
        });

        return makeSerializable(data);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getLast48hourData() {
    const tm = getLast48hours();
    try {
        const data = await prisma.data.findMany({
            where: {
                timestamp: {
                    gt: tm,
                },
            },
        });

        return makeSerializable(data);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getLastWeekData() {
    const tm = getLastWeek();
    try {
        const data = await prisma.data.findMany({
            where: {
                timestamp: {
                    gt: tm,
                },
            },
        });

        return makeSerializable(data);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getLastMonthData() {
    const tm = getLastMonth();
    try {
        const data = await prisma.data.findMany({
            where: {
                timestamp: {
                    gt: tm,
                },
            },
        });

        return makeSerializable(data);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function storeData(item) {
    try {
        const data = await prisma.data.create({
            data: item
        });

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export {
    getLast24hourData,
    getLast48hourData,
    getLastWeekData,
    getLastMonthData,
    storeData
};