export class Comunity {
    id: string;
    name: string;
    logo: string;
    description: string;

    constructor(
        id: string,
        name: string,
        logo: string,
        description: string
    ) {
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.description = description;
    }
}