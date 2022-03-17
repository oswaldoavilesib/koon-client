import type { NextPage } from "next";
import { ShopLayout } from "../../components/layout";
import { Box, Typography } from "@mui/material";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks/useProducts";
import { HeroArea, LoadingScreen } from "../../components/ui";

const WomenPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?type=artesanias");

  return (
    <ShopLayout
      title={"Koon - Artesanías Mexicanas"}
      pageDescription={"Mejores artesanías Méxicanas"}
    >
      <HeroArea
        title={"Artesanías yucatecas"}
        subtitle={
          "Encuentra productos para tu hogar, decoración y mucho más..."
        }
        callToAction={"Ir a la tienda"}
      />

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box display="flex" flexDirection="column">
          <Typography
            display="flex"
            justifyContent="center"
            alignItems="center"
            variant="h1"
            component="h2"
            sx={{ mb: 4 }}
          >
            Productos para hombre
          </Typography>
          <ProductList products={products} />
        </Box>
      )}
    </ShopLayout>
  );
};

export default WomenPage;
