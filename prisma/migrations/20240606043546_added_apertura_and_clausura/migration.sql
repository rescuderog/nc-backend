/*
  Warnings:

  - Added the required column `apertura` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clausura` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "apertura" TIME NOT NULL,
ADD COLUMN     "clausura" TIME NOT NULL;
