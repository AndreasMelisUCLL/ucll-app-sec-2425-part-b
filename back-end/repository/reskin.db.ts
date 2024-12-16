import database from "../util/database";

import { Piece } from '../model/piece';
import { Reskin } from '../model/reskin';

// METHODS _______________________________________________________________________________________

const getReskinsByPiece = async ({ piece }: { piece: Piece }) => {
    try {
        const reskinsPrisma = await database.reskin.findMany({
            where: {
                piece: piece.toString()
            },
            include: {
                theme: true
            }
        });

        return reskinsPrisma.map(Reskin.from);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getReskinByPieceAndTheme = async ({ piece, themeId }: { 
    piece: Piece, 
    themeId: number 
}) => {
    try {
        const reskinPrisma = await database.reskin.findUnique({
            where: {
                themeId_piece: {
                    themeId: themeId,
                    piece: piece.toString(),
                }
            },
            include: {
                theme: true
            }
        });

        return reskinPrisma
            ? Reskin.from(reskinPrisma)
            : null;

    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}


export default {
    getReskinsByPiece,
    getReskinByPieceAndTheme,
};