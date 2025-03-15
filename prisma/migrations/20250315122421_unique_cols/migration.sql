/*
  Warnings:

  - A unique constraint covering the columns `[userId,productId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,productId]` on the table `FavoriteItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartItem_userId_productId_key" ON "CartItem"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteItem_userId_productId_key" ON "FavoriteItem"("userId", "productId");
