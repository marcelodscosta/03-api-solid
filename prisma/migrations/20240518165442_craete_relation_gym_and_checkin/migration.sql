/*
  Warnings:

  - Added the required column `gymId` to the `chek_ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chek_ins" ADD COLUMN     "gymId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "chek_ins" ADD CONSTRAINT "chek_ins_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
