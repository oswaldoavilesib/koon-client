import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import React, {useContext,useEffect} from "react";
import { useForm } from "react-hook-form";
import { ShopLayout } from "../../components/layout";
import { countries } from "../../utils";
import { useRouter } from "next/router";
import { CartContext } from '../../context/cart/CartContext';

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {


  return {
    lastName: Cookies.get("lastName") || "",
    firstName: Cookies.get("firstName") || "",
    address: Cookies.get("address") || "",
    address2: Cookies.get("address2") || "",
    zipCode: Cookies.get("zipCode") || "",
    city: Cookies.get("city") || "",
    country: Cookies.get("country") || "",
    phone: Cookies.get("phone") || "",
  };
};

const AddressPage = () => {
  const router = useRouter();

  const {updateAddress } = useContext(CartContext)

  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm<FormData>({
    defaultValues: {
      lastName: "",
    firstName:  "",
    address:    "",
    address2:   "",
    zipCode:    "",
    city:       "",
    country:    "",
    phone:      "",
    }
  });

  useEffect(() => {
    reset(getAddressFromCookies())
  }, [reset])
  

  const onSubmitAddress = (data: FormData) => {


    updateAddress(data);
    router.push("/checkout/summary");
  };

  return (
    <ShopLayout title="Checkout" pageDescription="Confirmación de datos">
      <form onSubmit={handleSubmit(onSubmitAddress)}>
        <Typography variant="h1" component="h1">
          Dirección
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="filled"
              fullWidth
              {...register("firstName", {
                required: "Este campo es requerido.",
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              variant="filled"
              fullWidth
              {...register("lastName", {
                required: "Este campo es requerido.",
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección"
              variant="filled"
              fullWidth
              {...register("address", {
                required: "Este campo es requerido.",
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección 2 (opcional)"
              variant="filled"
              fullWidth
              {...register("address2")}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Código postal"
              variant="filled"
              fullWidth
              {...register("zipCode", {
                required: "Este campo es requerido.",
              })}
              error={!!errors.zipCode}
              helperText={errors.zipCode?.message}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ciudad"
              variant="filled"
              fullWidth
              {...register("city", {
                required: "Este campo es requerido.",
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <FormControl fullWidth> */}
              <TextField
                // select
                variant="filled"
                label="País"
                fullWidth
                // defaultValue={Cookies.get("country") || countries[0].code}
                {...register("country", {
                  required: "Este campo es requerido.",
                })}
                error={!!errors.country}
                helperText={errors.country?.message}
              >
              </TextField>
            {/* </FormControl> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono"
              variant="filled"
              fullWidth
              {...register("phone", {
                required: "Este campo es requerido.",
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            ></TextField>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Revisar Pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async({req}) => {

//   const { token = ''} = req.cookies;

//   let isValidToken = false;

//   try {

//     await jwt.isValidToken(token);
//     isValidToken = true

//   }catch(error){
//     isValidToken = false;
//   }

//   if(!isValidToken){
//     return {
//       redirect:{
//         destination:'/auth/login?p=/checkout/direccion',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {

//     }
//   }
// }

export default AddressPage;
