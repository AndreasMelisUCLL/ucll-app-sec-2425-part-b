import { PieceType, Color } from '../model/enumTypes';
import { Reskin } from '../model/reskin';
import { Theme } from '../model/theme';

const minions = new Theme({
    name: 'minion queen',
    description: 'your most valuable piece got even more valuable'
});
const reskins = [
    new Reskin({
        id: 1,
        for: {
            type: PieceType.QUEEN,
            color: Color.WHITE
        },
        theme: minions
    }),
    new Reskin({
        id: 2,
        for: {
            type: PieceType.QUEEN,
            color: Color.WHITE
        },
        theme: minions
    })
];

const getReskinById = ({ id }: { id: number }): Reskin | undefined => {
    try {
        return reskins.find(reskin => reskin.getId() === id);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getReskinsByTheme = ({ theme }: { theme: Theme }): Reskin[] => {
    try {
        return reskins.filter(reskin => reskin.getTheme().equals(theme));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getReskinsByPieceType = ({ pieceType }: { pieceType: PieceType }): Reskin[] => {
    try {
        return reskins.filter(reskin => reskin.getPiece().type === pieceType);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getReskinById,
    getReskinsByTheme,
    getReskinsByPieceType
};