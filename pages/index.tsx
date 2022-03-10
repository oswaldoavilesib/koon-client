import type { NextPage } from "next";
import { ShopLayout } from "../components/layout";
import { initialData } from "../database/products";

import { Typography } from "@mui/material";
import { ProductList } from "../components/products";

const Home: NextPage = () => {
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

      <ProductList products={initialData.products as any} />
    </ShopLayout>
  );
};

export default Home