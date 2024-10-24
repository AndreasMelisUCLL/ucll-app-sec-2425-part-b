import { Reskin } from "./reskin";
import { User } from "./user";

export class Preset {
    private id?: number;
    private name: string;
    private reskins: Reskin[];
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
        this.name = preset.name;
        this.reskins = preset.reskins;
        this.user = preset.user;
        this.isCurrent = preset.isCurrent;
    }
    
    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getReskins(): Reskin[] {
        return this.reskins;
    }

    getUser(): User {
        return this.user;
    }

    getIsCurrent(): boolean {
        return this.isCurrent;
    }
}