-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateTable
CREATE TABLE "PublicUser" (
    "id" BIGSERIAL NOT NULL,
    "storefrontId" INTEGER,
    "firstName" VARCHAR(1500),
    "lastName" VARCHAR(1500),
    "street1" VARCHAR(1500),
    "street2" VARCHAR(1500),
    "zipcode" VARCHAR(150),
    "city" VARCHAR(150),
    "state" VARCHAR(150),
    "country" VARCHAR(150),
    "email" VARCHAR(1500) NOT NULL,
    "phoneNumber" VARCHAR(50),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "password" VARCHAR(1500) NOT NULL,
    "resetPasswordToken" VARCHAR(150),
    "verifyEmailToken" VARCHAR(150),
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "resetPasswordTokenExpireAt" TIMESTAMPTZ(3),
    "referralCode" VARCHAR(1500),
    "inviterReferralCode" VARCHAR(1500),
    "memberId" VARCHAR(255),
    "dateOfBirth" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "receiveNotifications" BOOLEAN NOT NULL DEFAULT true,
    "receiveWebPush" BOOLEAN NOT NULL DEFAULT true,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "partnerId" BIGINT,
    "age" INTEGER NOT NULL DEFAULT 0,
    "gender" "Gender",

    CONSTRAINT "PublicUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicUser_resetPasswordToken_key" ON "PublicUser"("resetPasswordToken");

-- CreateIndex
CREATE UNIQUE INDEX "PublicUser_verifyEmailToken_key" ON "PublicUser"("verifyEmailToken");

-- CreateIndex
CREATE UNIQUE INDEX "PublicUser_storefrontId_email_key" ON "PublicUser"("storefrontId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "PublicUser_storefrontId_memberId_key" ON "PublicUser"("storefrontId", "memberId");
