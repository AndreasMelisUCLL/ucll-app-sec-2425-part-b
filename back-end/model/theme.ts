export class Theme {
    private id?: number;
    private name!: string;
    private description!: string;

    constructor(theme: {
        id?: number,
        name: string, 
        description: string, 
    }) {
        // Use setters to initialize the properties
        if (theme.id !== undefined) {
            this.setId(theme.id);
        }
        this.setName(theme.name);
        this.setDescription(theme.description);
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

    setId(id: number): void {
        this.id = id;
    }

    setName(name: string): void {
        if (!name || name.trim() === '') {
            throw new Error('Name is required');
        }
        this.name = name;
    }

    setDescription(description: string): void {
        if (!description || description.trim() === '') {
            throw new Error('Description is required');
        }
        this.description = description;
    }


    equals(theme: Theme): boolean {
        return this.name === theme.getName();
    }
}