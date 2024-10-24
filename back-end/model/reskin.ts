import { Color, PieceType } from "./enumTypes";
import { Theme } from "./theme";

export class Reskin {
    private id?: number;
    private for: PieceType;
    private as: Color;
    private imagePath: string;
    private theme: Theme;

    constructor(reskin: {
        id?: number,
        for: PieceType,
        as: Color,
        imagePath: string,
        theme: Theme
    }) {
        this.id = reskin.id;
        this.for = reskin.for;
        this.as = reskin.as;
        this.imagePath = reskin.imagePath;
        this.theme = reskin.theme;
    }

}