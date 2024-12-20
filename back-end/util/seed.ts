// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.reskinsForPresets.deleteMany();
    await prisma.preset.deleteMany();
    await prisma.reskin.deleteMany();
    await prisma.theme.deleteMany();
    await prisma.user.deleteMany();


    // USERS_________________________________________________________________________________________

    const user1 = await prisma.user.create({
        data: {
            username: 'john_doe',
            password: await bcrypt.hash('john123', 12),
            role: "user",
            presets: {
                create: {
                    id: 1,
                    name: 'default',
                },
            },
        },
        include: {
            presets: true,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'jane_doe',
            password: await bcrypt.hash('jane123', 12),
            role: "user",
            presets: {
                create: {
                    id: 2,
                    name: 'default',
                },
            },
        },
        include: {
            presets: true,
        },
    });

    const user3 = await prisma.user.create({
        data: {
            username: 'admin1',
            password: await bcrypt.hash('adminpass', 12),
            role: "admin",
            presets: {
                create: {
                    id: 3,
                    name: 'default',
                },
            },
        },
        include: {
            presets: true,
        },
    });

    // Set default active preset for both users
    await prisma.user.update({
        where: { id: user1.id },
        data: { activePresetId: user1.presets[0].id },
    });

    await prisma.user.update({
        where: { id: user2.id },
        data: { activePresetId: user2.presets[0].id },
    });

    await prisma.user.update({
        where: { id: user3.id },
        data: { activePresetId: user3.presets[0].id },
    });



    // THEMES AND RESKINS___________________________________________________________________________

    const horseyTheme = await prisma.theme.create({
        data: {
            name: 'horsey',
            description: 'goofy',
            reskins: {
                create: [
                    { piece: 'BLACK BISHOP' },
                    { piece: 'WHITE BISHOP' },
                ],
            },
        },
        include: {
            reskins: true,
        },
    });   

    const monarchyTheme = await prisma.theme.create({
        data: {
            name: 'monarchy',
            description: 'classy',
            reskins: {
                create: [
                    { piece: 'WHITE QUEEN' },
                    { piece: 'BLACK QUEEN' },
                ],
            },
        },
        include: {
            reskins: true,
        },
    });

    
    // PRESETS_______________________________________________________________________________________

    const horseyPreset = await prisma.preset.create({
        data: {
            name: 'horsey snipers',
            userId: user1.id,
            reskins: {
                create: [
                    { reskin: { connect: { id: horseyTheme.reskins[0].id } } },
                    { reskin: { connect: { id: horseyTheme.reskins[1].id } } },
                ],
            },
        },
    });

    await prisma.preset.create({
        data: {
            name: 'healthy mix',
            userId: user2.id,
            reskins: {
                create: [
                    { reskin: { connect: { id: monarchyTheme.reskins[0].id } } },
                    { reskin: { connect: { id: monarchyTheme.reskins[1].id } } },
                    { reskin: { connect: { id: horseyTheme.reskins[0].id } } },
                    { reskin: { connect: { id: horseyTheme.reskins[1].id } } },
                ],
            },
        },
    });

    // Update active preset for user1 to sniperPreset
    await prisma.user.update({
        where: { id: user1.id },
        data: { activePresetId: horseyPreset.id },
    });

};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();