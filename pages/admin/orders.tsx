import { ConfirmationNumberOutlined } from "@mui/icons-material";
import React from "react";
import { AdminLayout } from "../../components/layout";

const OrdersPage = () => {
  return (
    <AdminLayout
      title={"Ordenes"}
      subtitle={"Mantenimiento de ordenes"}
      icon={<ConfirmationNumberOutlined />}
    ></AdminLayout>
  );
};

export default OrdersPage;
