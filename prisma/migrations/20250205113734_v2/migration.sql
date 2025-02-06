-- CreateTable
CREATE TABLE "StorefrontProgram" (
    "id" BIGSERIAL NOT NULL,
    "storefrontId" INTEGER,
    "programId" INTEGER,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StorefrontProgram_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StorefrontProgram_storefrontId_programId_key" ON "StorefrontProgram"("storefrontId", "programId");
