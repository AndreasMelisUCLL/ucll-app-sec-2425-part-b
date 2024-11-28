import reskinDb     from "../repository/reskin.db";

import themeService from "./theme.service";

import utils from "../util"

import { Piece } from '../types';

// RETRIEVAL _______________________________________________________________________________________

const getReskinsByPiece = ({ piece }: { piece: Piece }) => {
    // retrieve reskins by piece
    return reskinDb.getReskinsByPiece({ piece });
};

const getReskinByPieceAndThemeId = ({ piece, themeId }: { piece: Piece, themeId: number }) => {
    // retrieve theme by id
    const theme = themeService.getThemeById({ id: themeId });
    
    // retrieve reskin by piece and theme
    const reskin = reskinDb.getReskinByPieceAndTheme({ piece, theme });

    // ensure reskin exists
    if (!reskin) {
        throw new Error(`Theme ${theme.name} does not have a reskin for ${utils.pieceToString(piece)}`);
    }

    return reskin;
}


export default {
    getReskinsByPiece,
    getReskinByPieceAndThemeId,
};