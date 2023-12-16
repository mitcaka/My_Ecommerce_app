import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Login from "./../Auth/Login";
import moment from "moment";
import { Select } from "antd";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import OrderDetails from "../../components/Form/OrderDetails";
import { Modal } from "antd";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const [orderProduct, setOrderProduct] = useState(null);
  const [visible, setVisible] = useState(false);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  console.log(orders);
  const getRowId = (row) => row._id;
  const columns = [
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
    },
    {
      field: "buyer",
      headerName: "Khách hàng",
      width: 120,
      valueGetter: (params) => params.row.buyer.name,
    },
    {
      field: "createAt",
      headerName: "Ngày tạo",
      width: 150,
      valueGetter: (params) => {
        const formattedDate = moment(params.row.createAt).format("L");
        const formattedTime = moment(params.row.createAt).format("LT");
        return `${formattedDate} ${formattedTime}`;
      },
    },
    {
      field: "updatedAt",
      headerName: "Ngày cập nhật",
      width: 150,
      valueGetter: (params) => {
        const formattedDate = moment(params.row.updatedAt).format("L");
        const formattedTime = moment(params.row.updatedAt).format("LT");
        return `${formattedDate} ${formattedTime}`;
      },
    },
    {
      field: "payment",
      headerName: "Thanh toán",
      width: 150,
      valueGetter: (params) => {
        return params.row.payment.success ? "Thành công" : "Thất bại";
      },
    },
    {
      field: "products.length",
      headerName: "Tổng tiền",
      width: 130,
      valueGetter: (params) => {
        return formatCurrency(calculateTotalAmount(params.row.orderItems));
      },
    },
    {
      field: "openModal",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => handleOpenModal(params.row.orderItems)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  const handleOpenModal = (products) => {
    setVisible(true);
    setOrderProduct(products);
  };

  function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  function calculateTotalAmount(orderItems) {
    let totalAmount = 0;
    orderItems.forEach((item) => {
      const { quantity, product } = item;
      const { price } = product;
      const itemTotal = quantity * price;
      totalAmount += itemTotal;
    });
    return totalAmount;
  }
  return (
    <Layout title={"Đơn hàng của bạn"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <Typography variant="h4">Đơn hàng đã đặt</Typography>
            <DataGrid
              rows={orders}
              columns={columns}
              getRowId={getRowId}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        </div>
        <Modal
          onCancel={() => setVisible(false)}
          footer={null}
          visible={visible}
        >
          <OrderDetails orderItems={orderProduct} />
        </Modal>
      </div>
    </Layout>
  );
};

export default Orders;
