export const enum Color {
    "WHITE",
    "BLACK"
}

export const enum PieceType {
    "KING",
    "QUEEN",
    "ROOK",
    "BISHOP",
    "KNIGHT",
    "PAWN"
}

type Piece = {
    type: PieceType;
    color: Color;
}

type Loadout = {
    KING: string;
    QUEEN: string;
    ROOK: string;
    BISHOP: string;
    KNIGHT: string;
    PAWN: string;
}

export type { Piece, Loadout };