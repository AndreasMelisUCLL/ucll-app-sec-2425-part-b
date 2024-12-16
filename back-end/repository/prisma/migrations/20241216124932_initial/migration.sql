-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "activePresetId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preset" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isCurrent" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Preset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reskin" (
    "id" SERIAL NOT NULL,
    "piece" TEXT NOT NULL,
    "themeId" INTEGER NOT NULL,

    CONSTRAINT "Reskin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReskinsForPresets" (
    "presetId" INTEGER NOT NULL,
    "reskinId" INTEGER NOT NULL,

    CONSTRAINT "ReskinsForPresets_pkey" PRIMARY KEY ("presetId","reskinId")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_activePresetId_key" ON "User"("activePresetId");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_activePresetId_key" ON "User"("id", "activePresetId");

-- CreateIndex
CREATE UNIQUE INDEX "Preset_userId_name_key" ON "Preset"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Reskin_themeId_piece_key" ON "Reskin"("themeId", "piece");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_name_key" ON "Theme"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activePresetId_fkey" FOREIGN KEY ("activePresetId") REFERENCES "Preset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preset" ADD CONSTRAINT "Preset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reskin" ADD CONSTRAINT "Reskin_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReskinsForPresets" ADD CONSTRAINT "ReskinsForPresets_presetId_fkey" FOREIGN KEY ("presetId") REFERENCES "Preset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReskinsForPresets" ADD CONSTRAINT "ReskinsForPresets_reskinId_fkey" FOREIGN KEY ("reskinId") REFERENCES "Reskin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
