export type PieceColor = "WHITE" | "BLACK";
export type PieceType = "PAWN" | "ROOK" | "KNIGHT" | "BISHOP" | "QUEEN" | "KING";
export type PieceString = `${PieceColor} ${PieceType}`;

export type pieceColorCode = "w" | "b";
export type pieceTypeCode = "P" | "R" | "N" | "B" | "Q" | "K";
export type PieceCode = `${pieceColorCode}${pieceTypeCode}`;

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

    // TO PIECE CODE ----------------------------
    public toPieceCode(): string {
        const colorCode = this.color[0].toLowerCase();
        const typeCode = (this.type === 'KNIGHT') ? 'N' : this.type[0].toUpperCase();
        return `${colorCode}${typeCode}`;
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