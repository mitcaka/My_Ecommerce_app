import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const OrderDetails = ({ products }) => {
  console.log(products);
  const getRowId = (row) => row._id;
  const columns = [
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 150,
      renderCell: (params) => (
        <img
          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${params.row._id}`}
          className="card-img-top"
          alt={params.row.name}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
        />
      ),
    },
    { field: "name", headerName: "Tên sản phẩm", width: 130 },
    { field: "price", headerName: "Giá sản phẩm", width: 180 },
    // {
    //   field: "payment",
    //   headerName: "Thanh toán",
    //   width: 150,
    //   valueGetter: (params) => {
    //     return params.row.payment.success ? "Thành công" : "Thất bại";
    //   },
    // },
    // {
    //   field: "products.length",
    //   headerName: "Tổng tiền",
    //   width: 130,
    //   valueGetter: (params) => {
    //     return params.row.payment.success ? "Thành công" : "Thất bại";
    //   },
    // },
  ];
  return (
    <>
      <DataGrid
        rows={products}
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
