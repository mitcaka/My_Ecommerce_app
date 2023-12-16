import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const OrderDetails = ({ orderItems }) => {
  console.log(orderItems);
  const getRowId = (row) => row.product._id;
  const columns = [
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 80,
      renderCell: (params) => (
        <img
          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${params.row.product._id}`}
          className="card-img-top"
          alt={params.row.product.name}
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      field: "product.name",
      headerName: "Tên sản phẩm",
      width: 180,
      valueGetter: (params) => params.row.product.name,
    },
    {
      field: "price",
      headerName: "Giá sản phẩm",
      width: 100,
      valueGetter: (params) => formatCurrency(params.row.product.price),
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      width: 150,
      valueGetter: (params) => {
        return params.row.quantity;
      },
    },
  ];
  function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  return (
    <>
      <DataGrid
        rows={orderItems}
        columns={columns}
        getRowId={getRowId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </>
  );
};

export default OrderDetails;
