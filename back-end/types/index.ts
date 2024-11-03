import { Color, PieceType } from "../model/enumTypes";

type Piece = {
    type: PieceType;
    color: Color;
}

type PresetInput = {
    id?: number;
    name: string;
    reskins: ReskinInput[];
    user: UserInput;
    isCurrent: boolean;
};

type ReskinInput = {
    id?: number;
    for: Piece;
    theme: ThemeInput;
}

type ThemeInput = {
    name: string;
    description: string;
}

type UserInput = {
    id?: number;
    username: string;
    password: string;
}

export type { Piece, PresetInput, ReskinInput, ThemeInput, UserInput };