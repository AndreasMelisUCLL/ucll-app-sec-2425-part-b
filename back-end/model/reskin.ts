import { Piece } from './piece';
import { Theme } from "./theme";

// RESKIN ________________________________________________________________________________________
export class Reskin {

    readonly id?: number;
    readonly piece: Piece;
    readonly theme: Theme;


    // CONSTRUCTOR ------------------------------
    constructor(reskin: {
        id?: number,
        piece: Piece,
        theme: Theme
    }) {
        this.id = reskin.id;
        this.piece = reskin.piece;
        this.theme = reskin.theme;
    }


    // EQUALS -----------------------------------
    equals(reskin: Reskin): boolean {
        return (
            this.piece === reskin.piece &&
            this.theme.equals(reskin.theme)
        );
    }

}
