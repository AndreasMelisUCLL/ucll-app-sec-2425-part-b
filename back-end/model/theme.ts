export class Theme {
    private id?: number;
    private name: string;
    private description: string;

    constructor(theme: {
        id?: number,
        name: string, 
        description: string, 
    }) {
        this.id = theme.id;
        this.name = theme.name;
        this.description = theme.description;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    equals(theme: Theme): boolean {
        return this.name === theme.getName();
    }
}