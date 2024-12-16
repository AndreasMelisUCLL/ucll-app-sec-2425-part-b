import { Theme as ThemePrisma } from '@prisma/client';

// THEME _________________________________________________________________________________________
export class Theme {

    readonly id?: number;
    readonly name: string;
    readonly description!: string;


    // CONSTRUCTOR ------------------------------
    constructor(theme: {
        id?: number,
        name: string, 
        description: string, 
    }) {
        Theme.validate(theme);

        this.id = theme.id;
        this.name =theme.name;
        this.description = theme.description;
    }


    // STATICS ----------------------------------
    static validate(theme: {
        id?: number,
        name: string,
        description: string,
    }) {
        // name
        if (!theme.name || theme.name.trim() === '') {
            throw new Error('Name is required');
        }

        // description
        if (!theme.description || theme.description.trim() === '') {
            throw new Error('Description is required');
        }
    }


    // EQUALS -----------------------------------
    equals(theme: Theme): boolean {
        return this.name === theme.name;
    }


    // FROM -------------------------------------
    static from({
        id,
        name,
        description
    }: ThemePrisma): Theme {
        return new Theme({
            id,
            name,
            description
        });
    }
}