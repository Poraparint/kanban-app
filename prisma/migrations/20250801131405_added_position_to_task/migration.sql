/*
  Warnings:

  - You are about to drop the column `position` on the `columns` table. All the data in the column will be lost.
  - Added the required column `position` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."columns_boardId_position_key";

-- AlterTable
ALTER TABLE "public"."columns" DROP COLUMN "position";

-- AlterTable
ALTER TABLE "public"."tasks" ADD COLUMN     "position" INTEGER NOT NULL;
