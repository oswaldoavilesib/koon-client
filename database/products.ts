interface SeedProduct {
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'men'|'women'|'kid'|'unisex' | 'none'
}

type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL'|'No sizes';
type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats'| 'artesanias';

interface SeedData {
    products: SeedProduct[],
}




export const initialData: SeedData = {
    products: [
        {
            description: "Guayabera blanca manga larga, con bordado artesanal marino y turquesa.",
            images: [
                'guayabera1.png',
                'guayabera2.png',
            ],
            inStock: 0,
            price: 75,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "guayabera-elegante",
            type: 'shirts',
            tags: ['yucatan'],
            title: "Guayabera Elegante",
            gender: 'men'
        },
        {
            description: "Blusa huipil yucateco con rosas de colores",
            images: [
                'blusahipil.png',
                'blusahipil.png',
            ],
            inStock: 5,
            price: 200,
            sizes: ['XS','S','M','XL','XXL'],
            slug: "blusa-huipil",
            type: 'shirts',
            tags: ['yucatan'],
            title: "Blusa Huipil con Flores",
            gender: 'women'
        },
        {
            description: "Blusaa huipil yucateco con rosas de colores",
            images: [
                'blusahipil.png',
                'blusahipil.png',
            ],
            inStock: 5,
            price: 200,
            sizes: ['XS','S','M','XL','XXL'],
            slug: "blusaa-huipil",
            type: 'shirts',
            tags: ['yucatan'],
            title: "Blusaa Huipil con Flores",
            gender: 'kid',
        },
        {
            description: "Tortillero de Madera Parota Yucateco",
            images: [
                'tortillero-madera.png',
            ],
            inStock: 5,
            price: 200,
            sizes: ['XS','S','M','XL','XXL','No sizes'],
            slug: "tortillero-madera-yucateco",
            type: 'artesanias',
            tags: ['yucatan','artesanias'],
            title: "Tortillero de Madera Yucateco",
            gender: 'none',
        },
    
    ]
}