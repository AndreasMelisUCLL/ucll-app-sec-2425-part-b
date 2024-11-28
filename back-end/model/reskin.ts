import { Theme } from "./theme";

import { Piece, ReskinInput } from '../types';


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


    // STATICS ---------------------------------
    static toInput = (reskin: Reskin): ReskinInput => {
        if (!reskin.theme.id) {
            throw new Error("Reskin theme must have an id");
        }
        return {
            piece: reskin.piece,
            themeId: reskin.theme.id,
        }
    }


    // EQUALS -----------------------------------
    equals(reskin: Reskin): boolean {
        return (
            this.piece === reskin.piece &&
            this.theme.equals(reskin.theme)
        );
    }

}
