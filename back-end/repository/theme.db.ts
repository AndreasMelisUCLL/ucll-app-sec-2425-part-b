import database from "../util/database";

import { Theme } from '../model/theme';

// METHODS _______________________________________________________________________________________

const getThemeByName = async ({ name }: { name: string }) => {
    try {
        const themePrisma = await database.theme.findUnique({
            where: {
                name
            }
        });

        return themePrisma
            ? Theme.from(themePrisma)
            : undefined;

    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getThemeById = async ({ id }: { id: number }) => {
    try {
        const themePrisma = await database.theme.findUnique({
            where: {
                id
            }
        });

        return themePrisma
            ? Theme.from(themePrisma)
            : undefined;

    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}


export default {
    getThemeByName,
    getThemeById
};