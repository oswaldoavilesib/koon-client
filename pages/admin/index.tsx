import React ,{useState,useEffect} from "react";
import { AdminLayout } from "../../components/layout";
import {
  AccessTimeFilledOutlined,
  AttachmentOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import SummaryTile from "../../components/admin/SummaryTile";
import useSWR from "swr";
import { DashboardSummaryResponse } from "../../interfaces";

const AdminPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000 // 30 segundos
});

const [refreshIn, setRefreshIn] = useState(30);

useEffect(() => {
  const interval = setInterval(()=>{
    console.log('Tick');
    setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1: 30 );
  }, 1000 );

  return () => clearInterval(interval)
}, []);




if ( !error && !data ) {
    return <></>
}

if ( error ){
    console.log(error);
    return <Typography>Error al cargar la información</Typography>
}


const {
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    ProductsWithNoInventory,
    lowInventory,
    notPaidOrders,
} = data!;


  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Estadísticas generales"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={numberOfOrders}
          subtitle={"Ordenes totales"}
          icon={
            <CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} />
          }
        />

        <SummaryTile
          title={paidOrders}
          subtitle={"Ordenes pagadas"}
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={notPaidOrders}
          subtitle={"Ordenes pendientes"}
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={numberOfClients}
          subtitle={"Clientes"}
          icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={numberOfProducts}
          subtitle={"Productos"}
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={ProductsWithNoInventory}
          subtitle={"Productos sin existencias"}
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
          }
        />

        <SummaryTile
          title={lowInventory}
          subtitle={"Bajo inventario"}
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
        />

        <SummaryTile
          title={refreshIn}
          subtitle={"Actualización en:"}
          icon={
            <AccessTimeFilledOutlined color="secondary" sx={{ fontSize: 40 }} />
          }
        />
      </Grid>
    </AdminLayout>
  );
};

export default AdminPage;
