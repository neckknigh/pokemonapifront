export class Promotion {
    id: string;
    name: string;
    description: string;
    imagePath: string;

    constructor(
        id: string,
        name: string,
        description: string,
        imagePath: string
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
    };
}