import { Piece } from "../types";
import { Theme } from "./theme";

export class Reskin {
    private id?: number;
    private for: Piece;
    private theme: Theme;

    constructor(reskin: {
        id?: number,
        for: Piece,
        theme: Theme
    }) {
        this.id = reskin.id;
        this.for = reskin.for;
        this.theme = reskin.theme;
    }

    getId(): number | undefined {
        return this.id;
    }
    
    getPiece(): Piece {
        return this.for;
    }

    getTheme(): Theme {
        return this.theme;
    }

    equals(reskin: Reskin): boolean {
        return (
            this.for === reskin.getPiece() &&
            this.theme.equals(reskin.getTheme())
        );
    }
}
