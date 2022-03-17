import type { NextPage } from "next";
import { ShopLayout } from "../components/layout";
import { Box, Button, Paper, Typography } from "@mui/material";
import { ProductList } from "../components/products";
import { useProducts } from "../hooks/useProducts";
import { LoadingScreen, HeroArea } from "../components/ui";
import Image from "next/image";

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts("/products");
  return (
    <ShopLayout
      title={"Koon - Tienda de Productos Locales"}
      pageDescription={
        "Ayudamos a los productores locales a tener más ventas y crecer su negocio"
      }
    >
      <HeroArea title='Una forma distinta de ayudar a nuestros productores locales.' subtitle='Ponemos a tu disposición los mejores productos de Yucatán.' callToAction='Ir a la tienda'/>
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
            Últimos Productos
          </Typography>
          <ProductList products={products} />
        </Box>
      )}
    </ShopLayout>
  );
};

export default HomePage;
