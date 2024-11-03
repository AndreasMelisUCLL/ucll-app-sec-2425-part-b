import { PieceType, Color } from '../types';
import { Reskin } from '../model/reskin';
import { Theme } from '../model/theme';

const defaultTheme = new Theme({
    name: 'default',
    description: 'The default theme for chess pieces.'
});
const reskins: Reskin[] = [
    new Reskin({
        for: {
            type: PieceType.KING,
            color: Color.WHITE
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.KING,
            color: Color.BLACK
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.QUEEN,
            color: Color.WHITE
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.QUEEN,
            color: Color.BLACK
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.ROOK,
            color: Color.WHITE
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.ROOK,
            color: Color.BLACK
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.BISHOP,
            color: Color.WHITE
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.BISHOP,
            color: Color.BLACK
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.KNIGHT,
            color: Color.WHITE
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.KNIGHT,
            color: Color.BLACK
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.PAWN,
            color: Color.WHITE
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.PAWN,
            color: Color.BLACK
        },
        theme: defaultTheme
    }),
];

const getReskinById = ({ id }: { id: number }): Reskin | undefined => {
    try {
        return reskins.find(reskin => reskin.getId() === id);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getReskinByPieceAndThemeName = ({ piece, theme }: { piece: PieceType, theme: string }): Reskin | undefined => {
    try {
        return reskins.find(reskin => reskin.getPiece().type === piece && reskin.getTheme().getName() === theme);
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
    getReskinsByPieceType,
    getReskinByPieceAndThemeName
};