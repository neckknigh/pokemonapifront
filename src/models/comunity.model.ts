export class Comunity {
    id: string;
    name: string;
    logo: string;
    description: string;
    likeUserPhotos?: string[];

    constructor(
        id: string,
        name: string,
        logo: string,
        description: string,
        likeUserPhotos: string[]
    ) {
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.description = description;
        this.likeUserPhotos = likeUserPhotos;
    }
}