import{ FC} from "react";
import { ShopLayout } from "../../components/layout";
import { CartList,OrderSummary } from "../../components/cart";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";


const CartPage:FC = () => {
  
  return (
    <ShopLayout title="Carrito - 3" pageDescription="Koon - Carrito de compra">
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable/>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
                <Divider sx={{ mt: 1 }} />

                <OrderSummary />
                <Box sx={{ mt: 3 }}>
                  <Button color="secondary" className="circular-btn" fullWidth>
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
function useContext(CartContext: any): { addProductToCart: any; } {
  throw new Error("Function not implemented.");
}

