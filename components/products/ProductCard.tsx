import React, { FC, useMemo, useState } from "react";
import NextLink from "next/link";
import { IProduct } from "../../interfaces";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Link,
} from "@mui/material";

interface Props {
  product: IProduct;
}

const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(() => {
    return isHovered
      ? `products/${product.images[1]}`
      : `products/${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <NextLink href="/product/slug" passHref prefetch={false}>
          <Link>
            <CardActionArea>
              <CardMedia
                className="fadeIn"
                component="img"
                image={productImage}
                alt={product.title}
              ></CardMedia>
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box sx={{ mt: 1 }} className="fideIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography>{`$${product.price}`}</Typography>
      </Box>
    </Grid>
  );
};

export default ProductCard;
