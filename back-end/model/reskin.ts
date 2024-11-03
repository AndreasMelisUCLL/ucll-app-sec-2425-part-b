import { Color, PieceType } from "./enumTypes";
import { Theme } from "./theme";

export class Reskin {
    private id?: number;
    private for!: PieceType;
    private as!: Color;
    private theme!: Theme;

    constructor(reskin: {
        id?: number,
        for: PieceType,
        as: Color,
        theme: Theme
    }) {
        if (reskin.id !== undefined) {
            this.setId(reskin.id);
        }
        this.setPieceType(reskin.for);
        this.setColor(reskin.as);
        this.setTheme(reskin.theme);
    }

    getId(): number | undefined {
        return this.id;
    }
    
    getPieceType(): PieceType {
        return this.for;
    }

    getColor(): Color {
        return this.as;
    }

    getTheme(): Theme {
        return this.theme;
    }

    setId(id: number): void {
        this.id = id;
    }

    setPieceType(pieceType: PieceType): void {
        this.for = pieceType;
    }

    setColor(color: Color): void {
        this.as = color;
    }

    setTheme(theme: Theme): void {
        this.theme = theme;
    }

    equals(reskin: Reskin): boolean {
        return (
            this.for === reskin.getPieceType() &&
            this.theme.equals(reskin.getTheme())
        );
    }
}
