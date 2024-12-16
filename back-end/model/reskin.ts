import { 
    Reskin as ReskinPrisma,
    Theme as ThemePrisma
} from '@prisma/client';

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


    // FROM -------------------------------------
    static from({
        id,
        piece,
        theme
    }: ReskinPrisma & {
        theme: ThemePrisma
    }): Reskin {
        return new Reskin({
            id,
            piece: Piece.from(piece),
            theme: Theme.from(theme)
        });
    }

}
