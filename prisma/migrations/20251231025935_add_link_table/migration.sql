-- CreateTable
CREATE TABLE `Link` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `targetUrl` VARCHAR(191) NOT NULL,
    `hashId` VARCHAR(191) NOT NULL,
    `isValid` BOOLEAN NOT NULL,
    `visits` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `password` VARCHAR(191) NULL,
    `expiresAt` DATETIME(3) NULL,

    UNIQUE INDEX `Link_hashId_key`(`hashId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
