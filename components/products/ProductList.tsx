import React, { FC } from "react";
import { Grid, Card, CardActionArea, CardMedia } from "@mui/material";
import { IProduct } from "../../interfaces/";

import { ProductCard } from "./ProductCard";

interface Props {
  products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid sx={{ pl: 2, pr: 2 }} container spacing={4} id="shop-container">
      {products.map((product) => (
        <ProductCard product={product} key={product.slug} />
      ))}
    </Grid>
  );
};
