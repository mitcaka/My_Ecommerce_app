import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import OrderDetails from "../../components/Form/OrderDetails";
import { Modal } from "antd";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Chưa xử lý",
    "Đang xử lý",
    "Đã vận chuyển",
    "Đã nhận hàng",
    "Hủy hàng",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [orderProduct, setOrderProduct] = useState(null);
  const [visible, setVisible] = useState(false);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const getRowId = (row) => row._id;
  const columns = [
    {
      field: "checkStatus",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => (
        <Select
          bordered={false}
          onChange={(value) => handleChange(params.row._id, value)}
          defaultValue={params.row.status}
        >
          {status.map((s, i) => (
            <Option key={i} value={s}>
              {s}
            </Option>
          ))}
        </Select>
      ),
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
    <Layout title={"Đơn hàng"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <Typography variant="h4">Tất cả đơn hàng</Typography>
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

export default AdminOrders;
