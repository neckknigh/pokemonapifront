import { Category } from "./category.model";

export class Comunity {
    id: string;
    name: string;
    logo: string;
    description: string;
    likeUserPhotos?: string[];
    category: Category;
    averageScore?: number;

    constructor(
        id: string,
        name: string,
        logo: string,
        description: string,
        likeUserPhotos: string[],
        category: Category,
        averageScore: number = 0
    ) {
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.description = description;
        this.likeUserPhotos = likeUserPhotos;
        this.category = category;
        this.averageScore = averageScore;
    }
}