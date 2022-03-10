import React, { FC } from "react";
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

const SummaryPage = () => {
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
              <Typography variant="h2">Resumen (3 productos)</Typography>
              <Divider sx={{ mt: 1 }} />
              <Box display="flex" justifyContent="space-between" alignItems='center'>
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
                <Button color="secondary" className="circular-btn" fullWidth>
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
