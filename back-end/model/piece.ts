import { PieceColor, PieceType } from "../types";

export interface Piece {
    color: PieceColor;
    type: PieceType;
}

export function validatePiece(piece: { color: string, type: string }): void {
    if (!["WHITE", "BLACK"].includes(piece.color)) {
        throw new Error("Invalid color");
    } 
    if (!["PAWN", "ROOK", "KNIGHT", "BISHOP", "QUEEN", "KING"].includes(piece.type)) {
        throw new Error("Invalid piece");
    }
}

export function pieceOf(piece: {
    color: string, 
    type: string
}): Piece {

    validatePiece(piece);

    return {
        color: piece.color as PieceColor,
        type: piece.type as PieceType
    };
}

export function pieceString(piece: Piece): string {
    return `${piece.color} ${piece.type}`.toLowerCase();
}

