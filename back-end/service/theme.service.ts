import themeDb from "../repository/theme.db";

// RETRIEVAL _______________________________________________________________________________________

const getThemeById = async ({ id }: { id: number }) => {
    const theme = await themeDb.getThemeById({ id });
    if (!theme) {
        throw new Error(`Theme with id ${id} not found`);
    }
    return theme;
};


export default { 
    getThemeById
};