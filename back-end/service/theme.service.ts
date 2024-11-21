import themeDb from "../repository/theme.db";

// RETRIEVAL _______________________________________________________________________________________

const getThemeById = ({ id }: { id: number }) => {
    const theme = themeDb.getThemeById({ id });
    if (!theme) {
        throw new Error(`Theme with id ${id} not found`);
    }
    return theme;
};


export default { 
    getThemeById
};