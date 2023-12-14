import React from "react";
import TextField from "@mui/material/TextField";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <TextField
            id="outlined-basic"
            label="Tên danh mục"
            variant="outlined"
            type="text"
            className="form-control"
            placeholder="Nhập tên danh mục"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
