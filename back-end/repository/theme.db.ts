import { Theme } from '../model/theme';


const themes = [
    new Theme({
        id: 1, 
        name: 'default',
        description: 'The known and loved.' 
    }),
    new Theme({
        id: 2,
        name: 'minion',
        description: 'The better one.'
    })
];

const getThemeByName = ({ name }: { name: string }): Theme | undefined => {
    try {
        return themes.find(theme => theme.getName() === name);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getThemeById = ({ id }: { id: number }): Theme | undefined => {
    try {
        return themes.find(theme => theme.getId() === id);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getThemeByName,
    getThemeById
};