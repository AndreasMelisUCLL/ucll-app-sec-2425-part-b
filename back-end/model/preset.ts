import { 
    Preset as PresetPrisma,
    Reskin as ReskinPrisma,
    User as UserPrisma,
    Theme as ThemePrisma
} from '@prisma/client';
import { Piece }    from './piece';
import { Reskin }   from "./reskin";
import { User }     from "./user";

// PRESET ________________________________________________________________________________________
export class Preset {

    readonly id?: number;
    readonly name: string;
    readonly reskins!: Reskin[];
    readonly user: User;
    readonly isActive: boolean;
    
    // CONSTRUCTOR ------------------------------
    constructor(preset: {
        id?: number,
        name: string,
        reskins: Reskin[],
        user: User,
        isActive?: boolean,
    }) {
        Preset.validate(preset);

        this.id = preset.id;
        this.name = preset.name;
        this.reskins = preset.reskins;
        this.user = preset.user;
        this.isActive = preset.isActive ?? false;
    }

    // STATICS ----------------------------------
    static validate(preset: {
        id?: number,
        name: string,
        reskins: Reskin[],
        user: User,
    }) {
        // name
        const nameRegex = /^[a-zA-Z0-9_ ]+$/; // Only alphanumeric + underscore + space
        if (!nameRegex.test(preset.name)) {
            throw new Error("Name can only contain letters, numbers, underscores and spaces");
        }
        if (preset.name.trim() === "") {
            throw new Error("Name cannot be blank");
        }

        // reskins
        if (preset.reskins.length > 12) {
            throw new Error("Presets cannot have more than 12 reskins");
        }
        const reskinnedPieces: Piece[] = preset.reskins.map(reskin => reskin.piece);        
        if (reskinnedPieces.length !== new Set(reskinnedPieces).size) {
            throw new Error("Cannot have multiple reskins for the same piece");
        }
    }

    // EQUALS -----------------------------------
    equals(preset: Preset): boolean {
        return(
            this.user === preset.user &&
            this.name === preset.name
        )
    }

    // FROM -------------------------------------
    static from({
        id,
        name,
        reskins,
        user,
        activeUser,
    }: PresetPrisma & {
        reskins: ({reskin: ReskinPrisma & {theme: ThemePrisma}})[],
        user: UserPrisma,
        activeUser?: UserPrisma | null,
    }) {
        return new Preset({
            id,
            name,
            reskins: reskins.map((item) => Reskin.from(item.reskin)),
            user: User.from(user),
            isActive: activeUser ? true : false,
        });
    }

}