-- CreateTable
CREATE TABLE "SendEmails" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sendTo" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "SendEmails_pkey" PRIMARY KEY ("id")
);
