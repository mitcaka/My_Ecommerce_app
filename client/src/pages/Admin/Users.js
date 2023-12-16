import React, { useState, useEffect } from "react";
import AdminMenu from "./../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const Users = () => {
  const [users, setUsers] = useState([]);

  //get all
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-users`
      );
      setUsers(data);
      console.log(users);
    } catch (error) {
      console.log(error);
      toast.error("error in get all user");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getRowId = (row) => row._id;
  const columns = [
    { field: "name", headerName: "Tên khách hàng", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "phone", headerName: "SĐT", width: 130 },
    { field: "address", headerName: "Địa chỉ", width: 300 },
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
  ];
  return (
    <Layout title={"Quản lý - Khách hàng"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <p className="text-center">
              <Typography variant="h4">Tất cả khách hàng</Typography>
            </p>
            <DataGrid
              rows={users}
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
    </Layout>
  );
};

export default Users;
