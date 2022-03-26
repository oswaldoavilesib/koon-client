import bcrypt from 'bcryptjs'

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
  gender: "men" | "women" | "kid" | "unisex" | "none";
}


interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
}

type ValidSizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | "none";
type ValidTypes = "shirts" | "pants" | "hoodies" | "hats" | "artesanias";

interface SeedData {
  products: SeedProduct[];
  users: SeedUser[];
}

export const initialData: SeedData = {
    users: [
        {
            name: 'Oswaldo',
            email: 'oswaldoavilesib@gmail.com',
            password: bcrypt.hashSync('123456'),
            role: 'admin'
        },
    ],
  products: [
    {
      description:
        "Guayabera blanca manga larga, con bordado artesanal marino y turquesa.",
      images: ["guayabera1.png", "guayabera2.png"],
      inStock: 2,
      price: 750,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      slug: "guayabera-elegante",
      type: "shirts",
      tags: ["yucatan"],
      title: "Guayabera Elegante",
      gender: "men",
    },
    {
      description: "Blusa huipil yucateco con rosas de colores",
      images: ["blusahipil.png", "blusahipil2.png"],
      inStock: 5,
      price: 670,
      sizes: ["XS", "S", "M", "XL", "XXL"],
      slug: "blusa-huipil",
      type: "shirts",
      tags: ["yucatan"],
      title: "Blusa Huipil con Flores",
      gender: "women",
    },

  ],
};
