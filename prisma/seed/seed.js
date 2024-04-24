const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { processTransaction } = require("../../lib/helpers");

let transactions = require("./transactions.json");
let users = require("./users.json");

const prisma = new PrismaClient();

async function main() {
  const userList = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  }));

  transactions = transactions.map(processTransaction);

  const res = await prisma.user.createMany({
    data: userList,
  });

  console.log(res);

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
