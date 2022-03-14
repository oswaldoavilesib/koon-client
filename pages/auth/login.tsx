import React, { useState,useEffect } from "react";
import { GetServerSideProps } from "next";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Chip,
  Divider,
} from "@mui/material";
import { AuthLayout } from "../../components/layout";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";
import { ErrorOutline } from "@mui/icons-material";
import { useRouter } from "next/router";
import { signIn, getSession, getProviders } from "next-auth/react";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);

  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then(prov => {
      setProviders(prov)
    })
  }, [])
  

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    await signIn("credentials", { email, password });
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
                sx={{ display: showError ? "flex" : "none" }}
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
              <NextLink
                href={
                  router.query.p
                    ? `/auth/signup?p=${router.query.p?.toString()}`
                    : "/auth/signup"
                }
                passHref
              >
                <Link underline="always">¿Aún no tienes cuenta?</Link>
              </NextLink>
            </Grid>
            <Grid  item xs={12} display="flex" flexDirection='column' justifyContent="end">
              <Divider sx={{width: '100%', mb:2}}/>
              {
                Object.values(providers).map((provider:any) => {
                  if(provider.id === 'credentials'){
                    return (<div key="credentials"></div>)
                  }
                  return (
                    <Button key={provider.id} variant="outlined" fullWidth color="primary" sx={{mb:1}} onClick={()=>signIn(provider.id)} >{provider.name} </Button>
                  )
                })
              }
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req,query }) => {
  const session = await getSession({ req });



  const {p ='/' } = query

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent:false,
      }
    }
  }

  return {
    props: {},
  };
};

export default LoginPage;
