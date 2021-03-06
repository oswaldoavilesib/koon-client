export interface IProduct {
    _id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ISize[];
    slug: string;
    tags: string[];
    title: string;
    type: ITypes;
    gender: 'men'|'women'|'kid'|'unisex'|'none';


    //TODO: Created At y unpdated
    createdAt: string;
    updatedAt:string;
}

export type ISize = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL'|'none';
export type ITypes = 'shirts'|'pants'|'hoodies'|'hats'| 'artesanias';