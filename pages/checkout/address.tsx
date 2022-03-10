import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { ShopLayout } from "../../components/layout/";

const AddressPage = () => {
  return (
    <ShopLayout title="Checkout" pageDescription="Confirmación de datos">
      <Typography variant="h1" component="h1">
        Dirección
      </Typography>
      <Grid container spacing={2} sx={{mt:1}}>
        <Grid item xs={12} sm={6}>
          <TextField label="Nombre" variant="filled" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Apellido" variant="filled" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Dirección" variant="filled" fullWidth></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Dirección 2 (opcional)"
            variant="filled"
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Código postal"
            variant="filled"
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>País</InputLabel>
            <Select variant="filled" label="País" value={1}>
                <MenuItem value={1}>México</MenuItem>
                <MenuItem value={2}>Colombia</MenuItem>

                <MenuItem value={3}>Nicaragua</MenuItem>
                <MenuItem value={4}>Chile</MenuItem>

            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Teléfono" variant="filled" fullWidth></TextField>
        </Grid>
      </Grid>

      <Box sx={{mt:5}} display='flex' justifyContent="center">
          <Button color='secondary' className='circular-btn' size='large'>Revisar Pedido</Button>
      </Box>
      
    </ShopLayout>
  );
};

export default AddressPage;
