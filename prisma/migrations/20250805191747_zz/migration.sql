/*
  Warnings:

  - Made the column `salary` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Job" ALTER COLUMN "salary" SET NOT NULL,
ALTER COLUMN "salary" SET DATA TYPE TEXT;
