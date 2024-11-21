import { Reskin }   from "./reskin";
import { User }     from "./user";


// PRESET ________________________________________________________________________________________
export class Preset {

    readonly id?: number;
    readonly name: string;
    readonly reskins!: Reskin[];
    readonly user: User;
    readonly isCurrent: boolean;

    
    // CONSTRUCTOR ------------------------------
    constructor(preset: {
        id?: number,
        name: string,
        reskins: Reskin[],
        user: User,
    }) {
        Preset.validate(preset);

        this.id = preset.id;
        this.name = preset.name;
        this.reskins = preset.reskins;
        this.user = preset.user;
        this.isCurrent = false;
    }
    

    // STATICS ----------------------------------
    static validate(preset: {
        id?: number,
        name: string,
        reskins: Reskin[],
        user: User,
    }) {
        // name
        if (!preset.name || preset.name.trim() === "") {
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

}