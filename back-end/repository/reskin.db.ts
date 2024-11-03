import { PieceType, Color } from '../types';
import { Reskin } from '../model/reskin';
import { Theme } from '../model/theme';

const defaultTheme = new Theme({
    name: 'default',
    description: 'default Theme'
});
const reskins = [
    new Reskin({
        id: 1,
        for: {
            type: PieceType.KING,
            color: Color.WHITE,
        },
        theme: defaultTheme
    }),
    new Reskin({
        id: 2,
        for: {
            type: PieceType.QUEEN,
            color: Color.WHITE,
        },
        theme: defaultTheme
    }),
    new Reskin({
        id: 3,
        for: {
            type: PieceType.ROOK,
            color: Color.WHITE,
        },
        theme: defaultTheme
    }),
    new Reskin({
        id: 4,
        for: {
            type: PieceType.BISHOP,
            color: Color.WHITE,
        },
        theme: defaultTheme
    }),
    new Reskin({
        id: 5,
        for: {
            type: PieceType.KNIGHT,
            color: Color.WHITE,
        },
        theme: defaultTheme
    }),
    new Reskin({
        id: 6,
        for: {
            type: PieceType.PAWN,
            color: Color.WHITE,
        },
        theme: defaultTheme
    }),
    // Optionally, add the same for black pieces
    new Reskin({
        id: 7,
        for: {
            type: PieceType.KING,
            color: Color.BLACK,
        },
        theme: defaultTheme
    }),
    new Reskin({
        id: 8,
        for: {
            type: PieceType.QUEEN,
            color: Color.BLACK,
        },
        theme: defaultTheme
    }),
    new Reskin({
        id: 9,
        for: {
            type: PieceType.ROOK,
            color: Color.BLACK,
        },
        theme: defaultTheme
    }),
    new Reskin({
        id: 10,
        for: {
            type: PieceType.BISHOP,
            color: Color.BLACK,
        },
        theme: defaultTheme
    }),
    new Reskin({
        id: 11,
        for: {
            type: PieceType.KNIGHT,
            color: Color.BLACK,
        },
        theme: defaultTheme
    }),
    new Reskin({
        id: 12,
        for: {
            type: PieceType.PAWN,
            color: Color.BLACK,
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