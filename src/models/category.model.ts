export class Category {
    id: string;
    img: string;
    marker: string;
    name: string;

    constructor(
        id: string,
        img: string,
        marker: string,
        name: string
    ) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.marker = marker;
        this.name = name;
    }
}