/*
  Warnings:

  - You are about to drop the column `gymId` on the `chek_ins` table. All the data in the column will be lost.
  - Added the required column `gym_id` to the `chek_ins` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chek_ins" DROP CONSTRAINT "chek_ins_gymId_fkey";

-- AlterTable
ALTER TABLE "chek_ins" DROP COLUMN "gymId",
ADD COLUMN     "gym_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "chek_ins" ADD CONSTRAINT "chek_ins_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
