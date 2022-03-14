import React, { useContext,useEffect } from "react";
import { ShopLayout } from "../../components/layout";
import { CartList, OrderSummary } from "../../components/cart";
import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { CartContext } from '../../context';
import { countries } from '../../utils';
import Cookies from "js-cookie";
import { useRouter } from 'next/router';
import { countReset } from "console";
import { createRouteLoader } from "next/dist/client/route-loader";


const SummaryPage = () => {

  const router = useRouter()

  const {shippingAddress,numberOfItems,createOrder} = useContext(CartContext)

  useEffect(() => {
    if(!Cookies.get('firstName')){
      router.push('/checkout/address')
    }
  }, [router])

  const onCreateOrder = () => {
    createOrder();
  }

  if(!shippingAddress){
    return <></>
  }

  return (
    <ShopLayout
      title="Resumen de la compra"
      pageDescription="Resumen de la compra"
    >
      <Typography variant="h1" component="h1">
        Resumen de tu orden
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen {numberOfItems} {numberOfItems === 1 ? 'producto' : 'productos'}</Typography>
              <Divider sx={{ mt: 1 }} />
              <Box display="flex" justifyContent="space-between" alignItems='center'>
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>

                <NextLink href="/checkout/direccion" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>{`${shippingAddress?.firstName} ${shippingAddress?.lastName}`}</Typography>
              <Typography>{shippingAddress?.address} {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}</Typography>
              <Typography>{`${shippingAddress?.city}, ${shippingAddress?.zipCode}`}</Typography>
              <Typography>{shippingAddress?.country}</Typography>
              <Typography>{shippingAddress?.phone}</Typography>

              <Divider sx={{ mt: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart/" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button onClick={onCreateOrder} color="secondary" className="circular-btn" fullWidth>
                  Confirmar Orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
