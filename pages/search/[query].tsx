import type { NextPage, GetServerSideProps } from "next";

import { ShopLayout } from "../../components/layout";
import { Box, Typography } from "@mui/material";
import { ProductList } from "../../components/products";

import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query:string;
}

const SearchPage: NextPage<Props> = ({ products,foundProducts,query }) => {
  return (
    <ShopLayout
      title={"Koon - Buscar producto"}
      pageDescription={
        "Ayudamos a los productores locales a tener más ventas y crecer su negocio"
      }
    >

      <Typography variant="h1" component="h1">
        Buscar Producto en Kaan
      </Typography>

        {
            foundProducts
            ?   <Typography variant="h2" sx={{ marginBottom: 1 }} textTransform='capitalize'>Buscaste:{query}</Typography>
            : <Box display='flex'>
            <Typography variant="h2" sx={{ mb: 1 }}>No encontramos ningún producto:</Typography>
            <Typography variant="h2" sx={{ ml: 1 }} color='secondary' textTransform='capitalize'>{query}</Typography>
            </Box>
        }
     

      <ProductList products={products} />
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  //Let porque puede ser que no hayan productos
  let products = await dbProducts.getProductsByTerm(query);

  const foundProducts = products.length > 0;

  //Retornar otros productos

  if(!foundProducts){
      products = await dbProducts.getAllProducts()
  }


  return {
    props: {
      products,
      foundProducts,
      query
    },
  };
};

export default SearchPage;
