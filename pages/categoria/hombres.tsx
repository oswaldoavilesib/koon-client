import type { NextPage } from "next";
import { ShopLayout } from "../../components/layout";
import { Typography } from "@mui/material";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks/useProducts";
import { LoadingScreen } from "../../components/ui";

const ManPage: NextPage = () => {
  const { products,isLoading } = useProducts("/products?gender=men");

  return (
    <ShopLayout
      title={"Koon - Productos para hombres"}
      pageDescription={
        "Mejores productos locales para hombres"
      }
    >
      <Typography variant="h1" component="h1">
        Catálogo de productos para hombres
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

export default ManPage;
