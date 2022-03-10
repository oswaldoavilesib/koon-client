import React from "react";
import { Divider, Grid, Typography } from "@mui/material";

const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end' >
        <Typography>3 items</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end' >
        <Typography>{`$${155.36}`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end' >
        <Typography>{`$${30.36}`}</Typography>
      </Grid>
      <Divider/>
      <Grid item xs={6} sx={{mt:2}}>
        <Typography variant='subtitle1'>Total</Typography>
      </Grid>
      
      <Grid item xs={6} display='flex' justifyContent='end' >
        <Typography variant='subtitle1'>{`$${185.6}`}</Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;
