import { Piece } from "../model/piece";

import reskinDb from "../repository/reskin.db";

// RETRIEVAL _______________________________________________________________________________________

const getReskinsByPiece = async ({ piece }: { piece: Piece }) => {
    // retrieve reskins by piece
    return await reskinDb.getReskinsByPiece({ piece });
};

const getReskinByPieceAndTheme = async ({ piece, themeId }: { piece: Piece, themeId: number}) => {
    // retrieve reskin by piece and theme
    const reskin = await reskinDb.getReskinByPieceAndTheme({ piece, themeId });

    // ensure reskin exists
    if (!reskin) {
        throw new Error("Reskin not found");
    }

    return reskin;
}


export default {
    getReskinsByPiece: getReskinsByPiece,
    getReskinByPieceAndTheme,
};