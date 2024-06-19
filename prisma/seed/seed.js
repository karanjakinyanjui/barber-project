const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { processTransaction } = require("../../lib/helpers");

let transactions = require("./transactions.json");
let users = require("./users.json");

const prisma = new PrismaClient();

const genDates = () =>
  Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  });

const genRandomString = (len = 10) =>
  Math.random().toString(36).substring(len).toUpperCase();

const dates = [...genDates(), ...genDates(), ...genDates(), ...genDates()];

console.log(dates.length);

async function main() {
  // const userList = users.map((user) => ({
  //   ...user,
  //   email: `${user.email}@mail.com`,
  //   password: bcrypt.hashSync(user.password, 10),
  //   role: "EMPLOYEE",
  // }));

  // await prisma.user.createMany({
  //   data: userList,
  // });

  transactions = transactions.map((tx, idx) => ({
    ...processTransaction(tx),
    TransactionTime: dates[idx],
    TransID: genRandomString(),
  }));

  await prisma.transaction.createMany({ data: transactions });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
