/*
  Warnings:

  - You are about to drop the `_BookingToService` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookingId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BookingToService" DROP CONSTRAINT "_BookingToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookingToService" DROP CONSTRAINT "_BookingToService_B_fkey";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "bookingId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_BookingToService";

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
