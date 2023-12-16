import React, { useState, useEffect } from "react";
import AdminMenu from "./../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import moment from "moment";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { NavLink } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");

  //get all
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("error in get all product");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );

      if (data.success) {
        toast.success("Xóa sản phẩm thành công");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi ở đâu đó");
    }
  };

  const getRowId = (row) => row._id;
  const columns = [
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 100,
      renderCell: (params) => (
        <img
          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${params.row._id}`}
          className="card-img-top"
          alt={params.row.name}
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
          }}
        />
      ),
    },
    { field: "name", headerName: "Tên sản phẩm", width: 130 },
    { field: "price", headerName: "Giá sản phẩm", width: 130 },
    {
      field: "category",
      headerName: "Danh mục",
      width: 180,
      valueGetter: (params) => params.row.category.name,
    },
    { field: "quantity", headerName: "Số lượng", width: 80 },
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
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div>
          <Button variant="outlined">
            <NavLink
              to={`/dashboard/admin/product/${params.row.slug}`}
              className="list-group-item list-group-item-action"
            >
              <EditIcon fontSize="small" />
            </NavLink>
          </Button>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <Button variant="outlined">
              <NavLink
                to={`/dashboard/admin/create-product`}
                className="list-group-item list-group-item-action"
              >
                Thêm mới
              </NavLink>
            </Button>
            <p className="text-center">
              <Typography variant="h4">Tất cả sản phẩm</Typography>
            </p>
            <div className="d-flex">
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
