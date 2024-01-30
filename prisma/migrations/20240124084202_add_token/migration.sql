-- AlterTable
ALTER TABLE `profile` MODIFY `last_name` VARCHAR(100) NULL,
    MODIFY `image` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `token` VARCHAR(100) NULL;
