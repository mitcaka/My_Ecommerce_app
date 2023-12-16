import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";

import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { OverviewBudget } from "../../sections/overview/overview-budget";
import { OverviewTasksProgress } from "../../sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "../../sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "../../sections/overview/overview-total-profit";
import Typography from "@mui/material/Typography";

const Statistical = () => {
  const [budget, setBudget] = useState([0]);
  const [users, setUsers] = useState([0]);
  const [susscessOrder, setSusscessOrder] = useState([0]);
  const [totalMoney, setTotalMoney] = useState([0]);
  function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  const getBudget = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/budget`
      );
      setBudget(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderSusscess = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/susscess-order`
      );
      setSusscessOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalMoney = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/total-money`
      );
      setTotalMoney(data);
      console.log("Tong tien");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-users`
      );
      setUsers(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBudget();
    getUser();
    getOrderSusscess();
    getTotalMoney();
  }, []);
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <p className="text-center">
              <Typography variant="h4">Thống kê</Typography>
            </p>
            <Container maxWidth="xl">
              <Grid container spacing={3}>
                <Grid xs={12} sm={6} lg={3}>
                  <OverviewBudget
                    difference={budget[2]}
                    positive={budget[2] > 0}
                    sx={{ height: "100%" }}
                    value={formatCurrency(budget[0])}
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={3}>
                  <OverviewTotalCustomers
                    difference={16}
                    positive={false}
                    sx={{ height: "100%" }}
                    value={users}
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={3}>
                  <OverviewTasksProgress
                    sx={{ height: "100%" }}
                    value={susscessOrder}
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={3}>
                  <OverviewTotalProfit
                    sx={{ height: "100%" }}
                    value={formatCurrency(totalMoney)}
                  />
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Statistical;
