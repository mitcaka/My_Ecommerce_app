import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "./../hooks/useCategory";
import { NavLink } from "react-router-dom";

import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import ListItemIcon from "@mui/material/ListItemIcon";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"Tất cả danh mục"}>
      <div className="container">
        <div className="row">
          <Paper sx={{ width: 230 }}>
            <MenuList>
              {categories.map((c) => (
                <MenuItem>
                  <ListItemIcon>
                    <CameraEnhanceIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">
                    {" "}
                    <NavLink to={`/category/${c.slug}`}>{c.name}</NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </MenuList>
          </Paper>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
