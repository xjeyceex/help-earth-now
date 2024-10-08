-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "party" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "state" TEXT NOT NULL
);
