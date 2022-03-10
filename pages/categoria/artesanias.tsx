import type { NextPage } from "next";
import { ShopLayout } from "../../components/layout";
import { Typography } from "@mui/material";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks/useProducts";
import { LoadingScreen } from "../../components/ui";

const WomenPage: NextPage = () => {
  const { products,isLoading } = useProducts("/products?type=artesanias");

  return (
    <ShopLayout
      title={"Koon - Artesanías Mexicanas"}
      pageDescription={
        "Mejores artesanías Méxicanas"
      }
    >
      <Typography variant="h1" component="h1">
        Catálogo de artesanías mexicanas
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
