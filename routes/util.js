import _ from 'lodash';
import fs from 'fs';
import csv from 'csv-parser';
import { storeData } from "../db/data.js";

function groupByHourAndAvg(data) {
  const groupedByHour = _.groupBy(data, (item) => {
    const timestamp = new Date(item.timestamp);
    return `${timestamp.getFullYear()}-${(timestamp.getMonth() + 1).toString().padStart(2, '0')}-${timestamp.getDate().toString().padStart(2, '0')} ${timestamp.getHours().toString().padStart(2, '0')}`;
  });

  //console.log(groupedByHour);

  const averagedData = _.mapValues(groupedByHour, (group) => {
    const sum = _.sumBy(group, 'value');
    return sum / group.length;
  });

  //console.log(averagedData);

  const dataArray = [];

  for (const key in averagedData) {
    if (Object.hasOwnProperty.call(averagedData, key)) {
      const value = averagedData[key];
      dataArray.push({
        time: key,
        value: value
      })
    }
  }

  //console.log(dataArray);
  return dataArray;
}

function groupByDayAndAvg(data) {
  const groupedData = {};

  data.forEach(entry => {
    const date = new Date(entry.timestamp).toISOString().slice(0, 10); // 提取日期部分作为键值
    if (!groupedData[date]) {
      groupedData[date] = {
        total: 0,
        count: 0
      };
    }
    groupedData[date].total += entry.value;
    groupedData[date].count++;
  });

  const result = {};
  Object.keys(groupedData).forEach(date => {
    result[date] = groupedData[date].total / groupedData[date].count;
  });

  //console.log(result);

  const dataArray = [];

  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key)) {
      const value = result[key];
      dataArray.push({
        time: key,
        value: value
      })
    }
  }

  // Delete the first one
  dataArray.shift();

  //console.log(dataArray);
  return dataArray;
}

function isWithinLastYear(dateTime) {
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - dateTime.getTime();
  const oneYearInMillis = 365 * 24 * 60 * 60 * 1000;
  return timeDiff >= 0 && timeDiff <= oneYearInMillis;
}

function isValidData(row) {
  // check equipmentID
  if (row.equipmentId.trim().length === 0) {
    return false;
  }

  // check timestamp
  const strTimestamp = row?.timestamp;
  const date = new Date(strTimestamp);

  if (isNaN(date.getTime())) {
    return false;
  }

  // check timestamp range
  if (!isWithinLastYear(date)) {
    return false;
  }

  // check value
  const strValue = row?.value;
  const value = parseFloat(strValue);

  if (isNaN(value)) {
    return false;
  }

  // check range, valid value is from 0 to 1000
  if ((value <= 0) || (value > 1000)) {
    return false;
  }

  return true;
}

function readCSVandInsertData(file) {
  console.log('readCSVandInsertData');
  const results = [];

  fs.createReadStream(file)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      //console.log(results);
      results.forEach((row) => {
        //console.log(row);
        if (isValidData(row)) {
          console.log('Valid CSV data');

          const equipmentId = row.equipmentId;
          const timestamp = new Date(row.timestamp);
          const value = parseFloat(row.value);
          const isRaw = false;

          storeData({
            equipmentId: equipmentId,
            timestamp, timestamp,
            value, value,
            isRaw, isRaw
          });
        } else {
          console.error('Invalid CSV data');
        }
      });
    });
}

export { groupByHourAndAvg, groupByDayAndAvg, readCSVandInsertData };