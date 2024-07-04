import fs from 'fs';

function makeSerializable(o) {
  return JSON.parse(JSON.stringify(o));
}

function checkAndCreateDir(dirPath) {
  fs.access(dirPath, (err) => {
    if (err) {
      console.log(`${dirPath} Not exist, creating...`);
      fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) {
          console.error(`Create ${dirPath} Fail:`, err);
        } else {
          console.log(`${dirPath} Success！`);
        }
      });
    } else {
      ;
    }
  });
}

export {
  makeSerializable,
  checkAndCreateDir
}