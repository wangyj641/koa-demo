-- CreateTable
CREATE TABLE "Data" (
    "id" TEXT NOT NULL,
    "equipmentId" TEXT,
    "timestamp" TIMESTAMP(3),
    "value" DOUBLE PRECISION,
    "isRaw" BOOLEAN,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);
