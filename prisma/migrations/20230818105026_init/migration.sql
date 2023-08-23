/*
  Warnings:

  - You are about to drop the `user_profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_profile` DROP FOREIGN KEY `user_profile_user_Id_fkey`;

-- DropTable
DROP TABLE `user_profile`;
