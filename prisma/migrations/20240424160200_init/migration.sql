-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "phone" TEXT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TransactionType" TEXT NOT NULL,
    "TransID" TEXT NOT NULL,
    "TransTime" TEXT NOT NULL,
    "TransactionTime" DATETIME NOT NULL,
    "TransAmount" REAL NOT NULL,
    "BusinessShortCode" TEXT NOT NULL,
    "BillRefNumber" TEXT NOT NULL,
    "InvoiceNumber" TEXT,
    "OrgAccountBalance" TEXT,
    "ThirdPartyTransID" TEXT,
    "MSISDN" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "MiddleName" TEXT,
    "LastName" TEXT NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_TransID_key" ON "Transaction"("TransID");
