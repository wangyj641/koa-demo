//import { PrismaClient } from "@prisma/client";
import { PrismaClient } from '../prisma/generated/client/index.js'

const equipmentList = [
  'EQ-12345',
  'EM-12345',
  'ED-12345',
  'EP-12345',
  'EQ-12346',
  'EM-12346',
  'ED-12346',
  'EP-12346',
  'EQ-12347',
  'EM-12347',
  'ED-12347',
  'EP-12347',
]

const prisma = new PrismaClient();

async function main() {
  //clearUser();
  //clearData();

  //fillUser();
  fillData();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


//add fake data to table User
async function fillUser() {
  const user = await prisma.user.create({
    data: {
      name: "admin",
      email: "admin@gmail.com",
      password: "123456",
    },
  });
  //console.log(user);
}

// create fake data within 40 days, each hours has 5 data for single equipment
function createFakeData() {
  const dataArray = [];

  equipmentList.forEach((item) => {
    const numPointsPerHour = 5;
    const numHours = 24 * 40;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 40);

    for (let h = 0; h < numHours; h++) {
      const hourStart = new Date(startDate);
      hourStart.setHours(hourStart.getHours() + h);

      for (let i = 0; i < numPointsPerHour; i++) {
        const randomMinutes = Math.floor(Math.random() * 60);
        const randomSeconds = Math.floor(Math.random() * 60);

        const timePoint = new Date(hourStart);
        timePoint.setMinutes(randomMinutes);
        timePoint.setSeconds(randomSeconds);

        dataArray.push({
          equipmentId: item,
          timestamp: timePoint,
          value: Math.random() * 100,
          isRaw: true,
        });
      }
    }
  });

  return dataArray;
}

async function fillData() {
  const dataArray = createFakeData();
  await prisma.data.createMany({ data: dataArray });
}

async function clearUser() {
  await prisma.user.deleteMany({});
}

async function clearData() {
  await prisma.data.deleteMany({});
}
