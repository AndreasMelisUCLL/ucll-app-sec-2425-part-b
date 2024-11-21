type Color = "w" | "b";
type ColorString = "WHITE" | "BLACK";

type PieceType = "K" | "Q" | "R" | "B" | "N" | "P";
type PieceTypeString = "KING" | "QUEEN" | "ROOK" | "BISHOP" | "KNIGHT" | "PAWN";

type Piece = `${Color}${PieceType}`;
type PieceString = `${ColorString} ${PieceTypeString}`;

type PresetInput = {
    userId: number;
    name: string;
    reskinInputs: ReskinInput[];
};

type ReskinInput = {
    piece: Piece;
    themeId: number;
}

type UserInput = {
    id?: number;
    username: string;
    password: string;
}