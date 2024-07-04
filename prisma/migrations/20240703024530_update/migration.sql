/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Data` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Data_equipmentId_timestamp_key";

-- CreateIndex
CREATE UNIQUE INDEX "Data_id_key" ON "Data"("id");
