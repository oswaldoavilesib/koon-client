import { Grid, Box, Typography, TextField, Button, Link } from "@mui/material";
import React, { FC } from "react";
import { AuthLayout } from "../../components/layout";
import NextLink from "next/link";

const SignUpPage = () => {
  return (
    <AuthLayout title="Registrate en Koon">
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Crea tu cuenta en Koon
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Nombre" variant="filled" fullWidth></TextField>{" "}
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
              Crear cuenta
            </Button>{" "}
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="end"

          >
            <NextLink href="/auth/login" passHref>
              <Link underline="always">¿Ya tienes cuenta?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default SignUpPage;
