-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('ADMIN', 'EDITOR', 'READER');

-- CreateTable
CREATE TABLE "TimeZone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "utc_difference" INTEGER NOT NULL,

    CONSTRAINT "TimeZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "time_zone_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_pro" BOOLEAN NOT NULL,
    "last_month_payment_failed" BOOLEAN NOT NULL,
    "free_trial_finished" BOOLEAN NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "role" "EmployeeRole" NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_owner_id_key" ON "Company"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_time_zone_id_fkey" FOREIGN KEY ("time_zone_id") REFERENCES "TimeZone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
