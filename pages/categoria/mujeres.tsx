import type { NextPage } from "next";
import { ShopLayout } from "../../components/layout";
import { Typography } from "@mui/material";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks/useProducts";
import { LoadingScreen } from "../../components/ui";

const WomenPage: NextPage = () => {
  const { products,isLoading } = useProducts("/products?gender=women");

  return (
    <ShopLayout
      title={"Koon - Productos para mujeres"}
      pageDescription={
        "Mejores productos locales para mujeres"
      }
    >
      <Typography variant="h1" component="h1">
        Catálogo de productos para mujeres
      </Typography>
      <Typography variant="h4" sx={{ marginBottom: 1 }}>
        Todos los productos
      </Typography>

      {
        isLoading
        ? <LoadingScreen/>
        : <ProductList products={products} />

      }

    </ShopLayout>
  );
};

export default WomenPage;
