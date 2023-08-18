/*
  Warnings:

  - You are about to drop the `user_profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_profile` DROP FOREIGN KEY `user_profile_user_Id_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `user_profile`;
