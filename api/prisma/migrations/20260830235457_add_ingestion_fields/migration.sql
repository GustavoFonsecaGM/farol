/*
  Warnings:

  - A unique constraint covering the columns `[fingerprint]` on the table `jobs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[source_id,external_id]` on the table `jobs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `sources` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `external_id` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fingerprint` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raw` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `sources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "description" TEXT,
ADD COLUMN     "external_id" TEXT NOT NULL,
ADD COLUMN     "fingerprint" TEXT NOT NULL,
ADD COLUMN     "raw" JSONB NOT NULL,
ADD COLUMN     "remote" BOOLEAN,
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL,
ALTER COLUMN "company" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sources" ADD COLUMN     "last_synced_at" TIMESTAMPTZ(3),
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "jobs_fingerprint_key" ON "jobs"("fingerprint");

-- CreateIndex
CREATE INDEX "jobs_published_at_idx" ON "jobs"("published_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "jobs_source_id_external_id_key" ON "jobs"("source_id", "external_id");

-- CreateIndex
CREATE UNIQUE INDEX "sources_slug_key" ON "sources"("slug");
