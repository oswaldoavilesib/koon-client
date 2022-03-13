import { Grid, Box, Typography, TextField, Button, Link, Chip } from "@mui/material";
import React, { FC, useState } from "react";
import { AuthLayout } from "../../components/layout";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { koonApi } from "../../api";
import { validations } from "../../utils";
import { ErrorOutline } from "@mui/icons-material";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);

  const onRegisterForm = async ({ name,email, password}: FormData) => {
    setShowError(false);
    try {
      const { data } = await koonApi.post("/user/register", { name,email, password });

      const { token, user } = data;
      console.log({ token, user });
    } catch (error) {
      console.log("error en las credenciales");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <AuthLayout title="Registrate en Koon">
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crea tu cuenta en Koon
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
                label="Nombre"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "Este campo es requerido.",
                  minLength: {
                    value: 6,
                    message: "Necesita tener al menos 6 caractéres",
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              ></TextField>{" "}
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
              >
                {" "}
              </TextField>{" "}
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
                color="primary"
                className="circular-btn"
                size="large"
                fullWidth
                type="submit"
              >
                Crear cuenta
              </Button>{" "}
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/login" passHref>
                <Link underline="always">¿Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default SignUpPage;
