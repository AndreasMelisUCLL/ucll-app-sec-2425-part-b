import database     from "../util/database";

import { Preset }   from "../model/preset";


// METHODS _______________________________________________________________________________________

const save = async ({ name, user, reskins }: Preset): Promise<Preset> => {
    try {
        const presetPrisma = await database.preset.create({ 
            data: {
                name,
                user: { 
                    connect: { id: user.id } 
                },
                reskins: {
                    create: reskins.map(reskin => {
                        return { 
                            reskin: { connect: { id: reskin.id } } 
                        }
                    })
                },
            },
            include: {
                user: true,
                reskins: { include: { reskin: { include: { theme: true }}} },
            }
        });

        return Preset.from(presetPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getPresetById = async ({ id }: { id: number }) => {
    try {
        const presetPrisma = await database.preset.findUnique({
            where: { id },
            include: {
                user: true,
                reskins: { include: { reskin: { include: { theme: true }}} },
            }
        });

        return presetPrisma 
            ? Preset.from(presetPrisma) 
            : null;

    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getPresetsByUser = async ({ 
    userId 
}: {
    userId: number
}) => {
    try {
        const presetsPrisma = await database.preset.findMany({
            where: {
                userId
            },
            include: {
                user: true,
                activeUser: true,
                reskins: { include: { reskin: { include: { theme: true }}} },
            }
        });

        return presetsPrisma.map(Preset.from);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getActivePresetByUser = async ({
    userId
}: {
    userId: number
}) => {
    try {
        const presetPrisma = await database.preset.findFirst({
            where: {
                userId: userId,
                activeUser: { id: userId }
            },
            include: {
                user: true,
                reskins: { include: { reskin: { include: { theme: true }}} },
            }
        });

        return presetPrisma 
            ? Preset.from(presetPrisma)
            : null;

    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getPresetByUserAndName = async ({
    userId,
    name
}: {
    userId: number,
    name: string
}) => {
    try {
        const presetPrisma = await database.preset.findFirst({
            where: {
                userId,
                name
            },
            include: {
                user: true,
                reskins: { include: { reskin: { include: { theme: true }}} },
            }
        });

        return presetPrisma 
            ? Preset.from(presetPrisma) 
            : null;

    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}


export default {
    save, 
    getActivePresetByUser,
    getPresetById,
    getPresetsByUser,
    getPresetByUserAndName,
};