-- CreateEnum
CREATE TYPE "EntityStatus" AS ENUM ('PENDING', 'VALIDATED');

-- CreateEnum
CREATE TYPE "WorkType" AS ENUM ('BOUNTIES', 'GRANTS', 'GIGS', 'JOBS');

-- CreateTable
CREATE TABLE "BuilderPlace" (
    "id" SERIAL NOT NULL,
    "about" TEXT,
    "aboutTech" TEXT,
    "baseline" TEXT,
    "cover" TEXT,
    "customDomain" TEXT,
    "icon" TEXT,
    "logo" TEXT,
    "name" TEXT NOT NULL,
    "ownerId" INTEGER,
    "palette" JSONB NOT NULL,
    "preferredWorkTypes" "WorkType"[],
    "presentation" TEXT,
    "profilePicture" TEXT,
    "status" "EntityStatus" NOT NULL DEFAULT 'PENDING',
    "subdomain" TEXT,

    CONSTRAINT "BuilderPlace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "about" TEXT,
    "address" TEXT,
    "counterStartDate" INTEGER NOT NULL DEFAULT 0,
    "email" TEXT,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "picture" TEXT,
    "status" "EntityStatus" NOT NULL DEFAULT 'PENDING',
    "talentLayerId" TEXT,
    "weeklyTransactionCounter" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkerProfile" (
    "id" INTEGER NOT NULL,
    "skills" TEXT[],

    CONSTRAINT "WorkerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HirerProfile" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "HirerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BuilderPlaceCollaborators" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BuilderPlace_customDomain_key" ON "BuilderPlace"("customDomain");

-- CreateIndex
CREATE UNIQUE INDEX "BuilderPlace_ownerId_key" ON "BuilderPlace"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "BuilderPlace_subdomain_key" ON "BuilderPlace"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_talentLayerId_key" ON "User"("talentLayerId");

-- CreateIndex
CREATE UNIQUE INDEX "_BuilderPlaceCollaborators_AB_unique" ON "_BuilderPlaceCollaborators"("A", "B");

-- CreateIndex
CREATE INDEX "_BuilderPlaceCollaborators_B_index" ON "_BuilderPlaceCollaborators"("B");

-- AddForeignKey
ALTER TABLE "BuilderPlace" ADD CONSTRAINT "BuilderPlace_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkerProfile" ADD CONSTRAINT "WorkerProfile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HirerProfile" ADD CONSTRAINT "HirerProfile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BuilderPlaceCollaborators" ADD CONSTRAINT "_BuilderPlaceCollaborators_A_fkey" FOREIGN KEY ("A") REFERENCES "BuilderPlace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BuilderPlaceCollaborators" ADD CONSTRAINT "_BuilderPlaceCollaborators_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
