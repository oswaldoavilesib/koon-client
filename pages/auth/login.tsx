import { Grid, Box, Typography, TextField, Button, Link } from "@mui/material";
import React, { FC } from "react";
import { AuthLayout } from "../../components/layout";
import NextLink from "next/link";

const LoginPage = () => {
  return (
    <AuthLayout title="Ingresar a tu cuenta">
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Iniciar Sesión
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Correo" variant="filled" fullWidth></TextField>{" "}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="filled"
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Ingresar
            </Button>{" "}
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="end"

          >
            <NextLink href="/auth/register" passHref>
              <Link underline="always">¿Aún no tienes cuenta?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
