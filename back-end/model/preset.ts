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
        const typeColorSet: Set<[PieceType, Color]> = new Set();
        // create a set of piece types and colors
        reskins.forEach(reskin => {
            typeColorSet.add([reskin.getPieceType(), reskin.getColor()]);
        });
        // assert no duplicates
        if (typeColorSet.size != reskins.length) {
            throw new Error("Preset can't have multiple reskins for the same piece type");
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