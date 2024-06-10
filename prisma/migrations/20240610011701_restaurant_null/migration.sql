-- DropForeignKey
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_restaurantId_fkey";

-- AlterTable
ALTER TABLE "Producto" ALTER COLUMN "restaurantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
