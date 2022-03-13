import React, { FC, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Chip,
} from "@mui/material";
import { AuthLayout } from "../../components/layout";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { koonApi } from "../../api";
import { ErrorOutline } from "@mui/icons-material";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    try {
      const { data } = await koonApi.post("/user/login", { email, password });

      const { token, user } = data;
      console.log({ token, user });
    } catch (error) {
      console.log("error en las credenciales");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
    //TODO: redireccionar a la pantalla a la que estaba
  };

  return (
    <AuthLayout title="Ingresar a tu cuenta">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesión
              </Typography>
              <Chip
                label="No reconocemos ese usuario o contraseña"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{display: showError ? 'flex' : 'none'}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido.",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              ></TextField>{" "}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Mínimo 6 caractéres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Ingresar
              </Button>{" "}
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/register" passHref>
                <Link underline="always">¿Aún no tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
