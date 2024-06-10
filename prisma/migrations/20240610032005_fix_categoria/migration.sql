/*
  Warnings:

  - You are about to drop the column `productoId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_productoId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "productoId";

-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
