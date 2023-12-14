import React from "react";
import { NavLink } from "react-router-dom";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ClassIcon from "@mui/icons-material/Class";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import BarChartIcon from "@mui/icons-material/BarChart";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <Typography variant="h4">Menu quản trị</Typography>
        <Paper sx={{ width: 350 }}>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <ClassIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">
                <NavLink
                  to="/dashboard/admin/create-category"
                  className="list-group-item list-group-item-action"
                >
                  Quản lý danh mục
                </NavLink>
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <CameraEnhanceIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">
                <NavLink
                  to="/dashboard/admin/products"
                  className="list-group-item list-group-item-action"
                >
                  Quản lý sản phẩm
                </NavLink>
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ShoppingCartIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                <NavLink
                  to="/dashboard/admin/orders"
                  className="list-group-item list-group-item-action"
                >
                  Quản lý đơn hàng
                </NavLink>
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <SupervisedUserCircleIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                <NavLink
                  to="/dashboard/admin/users"
                  className="list-group-item list-group-item-action"
                >
                  Quản lý khách hàng
                </NavLink>
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <BarChartIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                <NavLink
                  to="/dashboard/admin/statistical"
                  className="list-group-item list-group-item-action"
                >
                  Thống kê
                </NavLink>
              </Typography>
            </MenuItem>
          </MenuList>
        </Paper>
      </div>
    </>
  );
};

export default AdminMenu;
