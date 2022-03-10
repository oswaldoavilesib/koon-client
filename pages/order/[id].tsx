import React, { FC } from "react";
import { ShopLayout } from "../../components/layout";
import { CartList, OrderSummary } from "../../components/cart";
import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";

const OrderPage = () => {
  return (
    <ShopLayout
      title="Resumen de la orden 123123213"
      pageDescription="Orden ABC1234"
    >
      <Typography variant="h1" component="h1">
        ORden ABC123{" "}
      </Typography>

      {/* <Chip
      sx={{my:2 }}
      label="Pendiente de pago" 
      variant="outlined" 
      color="error" 
      icon={<CreditCardOffOutlined/>}
      />
      
      */}
      <Chip
      sx={{my:2 }}
      label="Tu orden ya fue pagada" 
      variant="outlined" 
      color="success" 
      icon={<CreditScoreOutlined/>}
      />
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 productos)</Typography>
              <Divider sx={{ mt: 1 }} />
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>

                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>Oswaldo ailes</Typography>
              <Typography>Alún lugar</Typography>
              <Typography>Mérida, 3413</Typography>
              <Typography>Candadá</Typography>
              <Typography>999233281</Typography>

              <Divider sx={{ mt: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart/" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                {/* TODO: pagar */}
                <h1>Pagar</h1>
                <Chip
      sx={{my:2 }}
      label="Tu orden ya fue pagada" 
      variant="outlined" 
      color="success" 
      icon={<CreditScoreOutlined/>}
      />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
