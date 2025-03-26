/*
  Warnings:

  - Added the required column `count` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnumUserRoles" AS ENUM ('USER', 'ADMIN');

-- AlterEnum
ALTER TYPE "EnumOrderStatus" ADD VALUE 'DELIVERED';

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "count" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "order_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "EnumUserRoles" NOT NULL DEFAULT 'USER',
ADD COLUMN     "viewed_products" TEXT[];

-- CreateTable
CREATE TABLE "products_embeding" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "vector" JSONB NOT NULL,

    CONSTRAINT "products_embeding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_embeding_productId_key" ON "products_embeding"("productId");

-- AddForeignKey
ALTER TABLE "products_embeding" ADD CONSTRAINT "products_embeding_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
