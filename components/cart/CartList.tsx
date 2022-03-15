import React, { FC, useContext } from "react";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { ItemCounter } from "../ui";
import { CartContext } from "../../context";
import { ICartProduct, IOrderItem } from "../../interfaces";

interface Props {
  editable?: boolean;
  products?: IOrderItem[]
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
  const { cart, updateCartQuantity,removeProductInCart } = useContext(CartContext);


  const onNewProductQuantity = (product:ICartProduct,newQuantityValue:number) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product)
  }

  const productsToShow = products ? products : cart;

  return (
    <>
      {productsToShow.map((product) => (
        <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
          <Grid item sm={3}>
            {/* TODO: LLEVAR A LA PAGINA DEL PRODUCTO */}
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item sm={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>{product.size}</strong>
              </Typography>

              {editable ? (
                <ItemCounter
                  currentQuantity={product.quantity}
                  handleQuantity={(value) => onNewProductQuantity(product as ICartProduct,value)}
                  maxValue={10}
                />
              ) : (
                <Typography variant="h5">{product.quantity} {product.quantity > 1 ? "productos" : "producto"}</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            sm={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>

            {editable && (
              <Button variant="text" color="primary" onClick={() => removeProductInCart(product as ICartProduct)}>
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
