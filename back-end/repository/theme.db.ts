import { Theme } from '../model/theme';

// DUMMY DATA _____________________________________________________________________________________

const themes = [
    new Theme({
        id: 1, 
        name: 'default',
        description: 'The known and loved.' 
    }),
    new Theme({
        id: 2,
        name: 'sniper bishop',
        description: 'lining up the shots'
    }),
];

// METHODS _______________________________________________________________________________________

const getThemeByName = ({ name }: { name: string }): Theme | undefined => {
    try {
        return themes.find(theme => theme.name === name);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getThemeById = ({ id }: { id: number }): Theme | undefined => {
    try {
        return themes.find(theme => theme.id === id);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getThemeByName,
    getThemeById
};