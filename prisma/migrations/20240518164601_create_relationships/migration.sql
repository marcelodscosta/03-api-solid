/*
  Warnings:

  - Added the required column `user_id` to the `chek_ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chek_ins" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "chek_ins" ADD CONSTRAINT "chek_ins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
