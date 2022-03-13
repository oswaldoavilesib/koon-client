import type { NextPage } from "next";
import { ShopLayout } from "../components/layout";
import { Typography } from "@mui/material";
import { ProductList } from "../components/products";
import { useProducts } from "../hooks/useProducts";
import { LoadingScreen } from "../components/ui";

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts("/products");
  console.log("ENV", process.env.JWT_SECRET_SEED);
  return (
    <ShopLayout
      title={"Koon - Tienda de Productos Locales"}
      pageDescription={
        "Ayudamos a los productores locales a tener más ventas y crecer su negocio"
      }
    >
      <Typography variant="h1" component="h1">
        Koon - Ayudamos a los productores locales de México.
      </Typography>
      <Typography variant="h2" sx={{ marginBottom: 1 }}>
        Todos los productos
      </Typography>

      {isLoading ? <LoadingScreen /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
