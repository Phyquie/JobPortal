/*
  Warnings:

  - You are about to drop the column `companyLogo` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `jobDocUrl` on the `Job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Job" DROP CONSTRAINT "Job_createdBy_fkey";

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "companyLogo",
DROP COLUMN "jobDocUrl";

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
