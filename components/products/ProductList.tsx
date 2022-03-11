import React, { FC } from "react";
import { Grid, Card, CardActionArea, CardMedia } from "@mui/material";
import { IProduct } from "../../interfaces/";
import { initialData } from "../../database/products";

import {ProductCard} from "./ProductCard";

interface Props {
  products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
  return <Grid container spacing={4}>
      {
          products.map(product => (
              <ProductCard product={product} key={product.slug}/>
          ))
      }
      </Grid>;
};

