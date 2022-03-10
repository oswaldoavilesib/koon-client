import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import ShopLayout from "../../components/layout/ShopLayout";
import { ProductSlideshow,ProductSizeSelector } from "../../components/products";
import {ItemCounter} from "../../components/ui"
import {NextPage,GetServerSideProps} from 'next'
import { IProduct } from "../../interfaces";
import { db, dbProducts } from "../../database";

interface Props {
  product:IProduct
}

const ProductPage:NextPage<Props> = ({product}) => {



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

              <ItemCounter/> 
              <ProductSizeSelector  sizes={product.sizes}/>
            </Box>

            {/* Agregar al carrito */}

            <Button color="secondary" className="circular-btn">
              Agregar al carrito
            </Button>

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

export const getServerSideProps:GetServerSideProps = async({params}) => {
  
  const {slug = ''} = params as {slug: string};

  const product = await dbProducts.getProductBySlug(slug)

  if(!product){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return{
    props: {
      product
    }
  }
}

export default ProductPage;
