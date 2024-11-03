import { Piece } from "../types";
import { Color, PieceType } from "./enumTypes";
import { Reskin } from "./reskin";
import { User } from "./user";

export class Preset {
    private id?: number;
    private name!: string;
    private reskins!: Reskin[];
    private user: User;
    private isCurrent: boolean;

    constructor(preset: {
        id?: number,
        name: string,
        reskins: Reskin[],
        user: User,
        isCurrent: boolean
    }) {
        this.id = preset.id;
        this.setName(preset.name);
        this.setReskins(preset.reskins);
        this.user = preset.user;
        this.isCurrent = preset.isCurrent;
    }
    
    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    private setName(value: string): void {
        if (!value || value.trim() === "") {
            throw new Error("Name cannot be blank");
        }
        this.name = value;
    }

    getReskins(): Reskin[] {
        return this.reskins;
    }

    private setReskins(reskins: Reskin[]): void {
        // ensure the piece for each reskin is unique
        const reskinnedPieces: Piece[] = [];
        for (const reskin of reskins) {
            const piece = reskin.getPiece();
            if (reskinnedPieces.includes(piece)) {
                throw new Error("Cannot have multiple reskins for the same piece");
            }
            reskinnedPieces.push(piece);
        }
        this.reskins = reskins;
    }

    getUser(): User {
        return this.user;
    }

    getIsCurrent(): boolean {
        return this.isCurrent;
    }
}