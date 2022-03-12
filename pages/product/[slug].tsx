import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import React,{useState} from "react";
import { ShopLayout } from "../../components/layout/ShopLayout";
import {
  ProductSlideshow,
  ProductSizeSelector,
} from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ICartProduct, IProduct, ISize } from "../../interfaces";
import { db, dbProducts } from "../../database";
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CartContext } from "../../context";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {

  const router = useRouter()
  const {addProductToCart} = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    images: product.images[0],
    price: product.price,
    size:undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })  

  const handleSizeSelector = (size:ISize) => {
    setTempCartProduct({...tempCartProduct,size})
  }

  const onAddProduct = () => {

    if(!tempCartProduct.size) return

    //Llamar la acción del context para agregar al carrito.
    addProductToCart(tempCartProduct)
  }

  const handleQuantity = (quantity:number) => {
    setTempCartProduct({...tempCartProduct,quantity})
  }

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* Slideshow */}
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* Titulos */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="h2"
            >{`$${product.price}`}</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>

              <ItemCounter 
              currentQuantity={tempCartProduct.quantity}
              handleQuantity={handleQuantity}
              maxValue={product.inStock > 5 ? 5 : product.inStock}
              
              />
              <ProductSizeSelector sizes={product.sizes} selectedSize={tempCartProduct.size} handleSizeSelector={handleSizeSelector}/>
            </Box>

            {/* Agregar al carrito */}

            {product.inStock > 0 ? (
              <Button color="secondary" className="circular-btn" onClick={onAddProduct}>
                {
                tempCartProduct.size ? 'Agregar al carrito' : 'Seleccione una talla'
                }
              </Button>
            ) : (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              />
            )}

            {/* <Chip label="no hay disponibles" color="error" variant="outlined"/> */}
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2">Descripción</Typography>
            <Typography variant="body2">{product.description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

//getServerSideProps

// export const getServerSideProps:GetServerSideProps = async({params}) => {

//   const {slug = ''} = params as {slug: string};

//   const product = await dbProducts.getProductBySlug(slug)

//   if(!product){
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }

//   return{
//     props: {
//       product
//     }
//   }
// }

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = (await params) as { slug: string };

  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
