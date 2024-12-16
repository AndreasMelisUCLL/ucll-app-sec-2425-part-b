import { Piece, PieceType } from "../model/piece";

import reskinDb from "../repository/reskin.db";
import { Theme } from "../model/theme";

// RETRIEVAL _______________________________________________________________________________________

const getReskinsByPieceType = ({ pieceType }: { pieceType: PieceType }) => {
    // retrieve reskins by piece
    return reskinDb.getReskinsByPieceType({ pieceType });
};

const getReskinByPieceAndTheme = ({ piece, theme }: { piece: Piece, theme: Theme }) => {
    // retrieve reskin by piece and theme
    const reskin = reskinDb.getReskinByPieceAndTheme({ piece, theme });

    // ensure reskin exists
    if (!reskin) {
        throw new Error(`Theme ${theme.name} does not have a reskin for ${piece}`);
    }

    return reskin;
}


export default {
    getReskinsByPieceType: getReskinsByPieceType,
    getReskinByPieceAndTheme,
};