type PieceColor = "WHITE" | "BLACK";
type PieceType = "PAWN" | "ROOK" | "KNIGHT" | "BISHOP" | "QUEEN" | "KING";

type PresetInput = {
    userId: number;
    name: string;
    reskinInputs: ReskinInput[];
};

type ReskinInput = {
    piece: PieceInput;
    themeId: number;
}

type PieceInput = {
    color: PieceColor;
    type: PieceType;
}

type UserInput = {
    id?: number;
    username: string;
    password: string;
}

export {
    PieceColor,
    PieceType,
    PresetInput,
    ReskinInput,
    UserInput,
}