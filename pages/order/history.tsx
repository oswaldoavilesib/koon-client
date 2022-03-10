import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import React from "react";
import ShopLayout from "../../components/layout/ShopLayout";
import NextLink from "next/link";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Nombre Completo", width: 300 },
  { field: "id", headerName: "ID", width: 100 },

  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra información si esta pagada la orden o no",
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" variant="outlined" label="Pagada" />
      ) : (
        <Chip color="error" variant="outlined" label="No Pagada" />
      );
    },
  },
  {
    field: "order",
    headerName: "Ver orden",
    width: 200,
    sortable:false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/order/${params.row.id}`} passHref>
          <Link underline='always'>Ver orden</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullname: "Oswaldo Avilés", order: true },
  { id: 2, paid: false, fullname: "Danae Novelo", order: false },
  { id: 3, paid: true, fullname: "Natalia Avilés", order: true },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title="Historial de compras"
      pageDescription="Historial de compras"
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
