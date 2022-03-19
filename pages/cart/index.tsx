import { ShopLayout } from "../../components/layout";
import { CartList, OrderSummary } from "../../components/cart";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, {useContext, useEffect} from 'react';
import { CartContext } from "../../context";
import { useRouter } from 'next/router';

const CartPage = () => {

  const {isLoaded, cart} = useContext(CartContext)
  const router = useRouter()

  useEffect(() => {
    if(isLoaded && cart.length === 0){
      router.replace('/cart/empty')
    }
  
  }, [isLoaded,cart,router])
  
  if(!isLoaded  || cart.length === 0){
    return <></>
  }

  return (
    <ShopLayout title="Carrito - 3" pageDescription="Koon - Carrito de compra">
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ mt: 1 }} />

              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth href="/checkout/direccion">
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
