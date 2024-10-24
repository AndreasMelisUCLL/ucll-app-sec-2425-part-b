export class Theme {
    private id?: number;
    private name: string;
    private description: string;

    constructor(
        name: string, 
        description: string, 
        id?: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
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