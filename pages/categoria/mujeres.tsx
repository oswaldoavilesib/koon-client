import type { NextPage } from "next";
import { ShopLayout } from "../../components/layout";
import { Box, Typography } from "@mui/material";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks/useProducts";
import { HeroArea, LoadingScreen } from "../../components/ui";

const WomenPage: NextPage = () => {
  const { products,isLoading } = useProducts("/products?gender=women");

  return (
    <ShopLayout
      title={"Koon - Productos para mujeres"}
      pageDescription={
        "Mejores productos locales para mujeres"
      }
    >
      <HeroArea
        title={"Productos hechos para ti."}
        subtitle={"Renueva tu estilo con productos locales para mujer."}
        callToAction={"Ir a la tienda"}
      />

      {
        isLoading
        ? <LoadingScreen/>
        : (
          <Box display="flex" flexDirection="column">
            <Typography
              display="flex"
              justifyContent="center"
              alignItems="center"
              variant="h1"
              component="h2"
              sx={{ mb: 4 }}
            >
             Productos para mujer
            </Typography>
            <ProductList products={products} />
          </Box>
        )}

    </ShopLayout>
  );
};

export default WomenPage;
