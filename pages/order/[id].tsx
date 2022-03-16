import React, {useState} from "react";
import { ShopLayout } from "../../components/layout";
import { CartList, OrderSummary } from "../../components/cart";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { koonApi } from "../../api";
import { useRouter } from 'next/router';

export type OrderResponseBody = {

  id: string;
  status:
      | "COMPLETED"
      | "SAVED"
      | "APPROVED"
      | "VOIDED"
      | "PAYER_ACTION_REQUIRED";
};

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const router = useRouter()

  const { shippingAddress } = order;
  const [isPaying, setIsPaying] = useState(false)

  const onOrderCompleted = async (details:OrderResponseBody) => {
    if(details.status !== 'COMPLETED'){
      return alert('No se pudo completar el pago en PAypal');
    }

    setIsPaying(true)

    try {

      const {data} = await koonApi.post('/orders/pay',{
        transactionId:details.id,
        orderId:order._id,
      })

      router.reload()
      
    } catch (error) {
      setIsPaying(false)
      console.log(error)
      alert('Error')
    }
  }

  return (
    <ShopLayout title="Resumen de la orden" pageDescription="Orden ABC1234">
      <Typography variant="h1" component="h1">
        Orden: {order._id}
      </Typography>

      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Tu orden ya fue pagada"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Pendiente de pago"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({order.numberOfItems}{" "}
                {order.numberOfItems > 1 ? "productos" : "producto"})
              </Typography>
              <Divider sx={{ mt: 1 }} />
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
              </Box>

              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.address}{" "}
                {shippingAddress.address2
                  ? `, ${shippingAddress.address2}`
                  : ""}
                (
              </Typography>
              <Typography>
                {shippingAddress.city}, {shippingAddress.zipCode}
              </Typography>
              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ mt: 1 }} />

              <OrderSummary
                orderValues={{
                  numberOfItems: order.numberOfItems,
                  subTotal: order.subTotal,
                  total: order.total,
                  tax: order.tax,
                }}
              />
              <Box sx={{ mt: 3 }} display='flex' flexDirection='column' className='fadeIn'>


                <Box display='flex' justifyContent='center' className='fadeIn' sx={{display: isPaying ? 'flex' : 'none'}}>
                  <CircularProgress/>
                </Box>

                <Box sx={{display: isPaying ? 'none' : 'flex', flex:1}} flexDirection='column'>


                {order.isPaid ? (
                  <Chip
                    sx={{ my: 2 }}
                    label="Tu orden ya fue pagada"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: order.total.toString(),
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order!.capture().then((details) => {
                      onOrderCompleted(details)

                      // console.log({details})

                      //   const name = details.payer.name.given_name;
                        // alert(`Transaction completed by ${name}`);
                    });
                }}
            />
                
                )}


                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;

  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/order/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/order/history`,
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: `/order/history`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
