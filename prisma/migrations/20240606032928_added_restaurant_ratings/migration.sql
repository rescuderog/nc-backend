-- CreateTable
CREATE TABLE "RestaurantRating" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "RestaurantRating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RestaurantRating" ADD CONSTRAINT "RestaurantRating_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantRating" ADD CONSTRAINT "RestaurantRating_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
