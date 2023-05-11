-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone" TEXT,
    "welcome_flow_finished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");
