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

type PieceDTO = {
    type: string;
    color: string;
}

type Loadout = Map<PieceDTO, string>;

type Reskin = {
    piece: PieceDTO;
    theme: {
        id: number;
        name: string;
    }
}

export type { Piece, Loadout, Reskin, PieceDTO };