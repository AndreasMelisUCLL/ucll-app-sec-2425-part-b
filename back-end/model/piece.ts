export type PieceColor = "WHITE" | "BLACK";
export type PieceType = "PAWN" | "ROOK" | "KNIGHT" | "BISHOP" | "QUEEN" | "KING";
export type PieceString = `${PieceColor} ${PieceType}`;

export class Piece {

    readonly color: PieceColor;
    readonly type: PieceType;


    // CONSTRUCTOR ------------------------------
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


    // TO STRING --------------------------------
    public toString(): PieceString {
        return `${this.color} ${this.type}`;
    }


    // EQUALS -----------------------------------
    public equals(piece: Piece): boolean {
        return this.color === piece.color && this.type === piece.type;
    }


    // FROM -------------------------------------
    public static from(pieceString: string): Piece {
        try {
            const [color, type] = pieceString.split(' ');
            return new Piece({ color, type });
        } catch (error) {
            throw new Error('Invalid piece string');
        }
    }
}