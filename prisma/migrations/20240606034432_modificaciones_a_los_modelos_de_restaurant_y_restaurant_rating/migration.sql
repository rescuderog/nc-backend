/*
  Warnings:

  - Added the required column `telefono` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mensaje` to the `RestaurantRating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "telefono" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RestaurantRating" ADD COLUMN     "mensaje" TEXT NOT NULL;
