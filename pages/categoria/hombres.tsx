import type { NextPage } from "next";
import { ShopLayout } from "../../components/layout";
import { Box, Typography } from "@mui/material";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks/useProducts";
import { HeroArea, LoadingScreen } from "../../components/ui";

const ManPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=men");

  return (
    <ShopLayout
      title={"Koon - Productos para hombres"}
      pageDescription={"Mejores productos locales para hombres"}
    >
      <HeroArea
        title={"Productos hechos para ti."}
        subtitle={"Renueva tu estilo con productos locales para hombre."}
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

export default ManPage;
