export type PieceColor = "WHITE" | "BLACK";
export type PieceType = "PAWN" | "ROOK" | "KNIGHT" | "BISHOP" | "QUEEN" | "KING";

export class Piece {

    readonly color: PieceColor;
    readonly type: PieceType;

    public constructor({ 
        color: colorString, 
        type: typeString 
    }: {
        color: string,
        type: string
    }) {
        this.color = colorString as PieceColor;
        this.type = typeString as PieceType;
    }

    public toString(): string {
        return `${this.color} ${this.type}`.toLowerCase();
    }
}