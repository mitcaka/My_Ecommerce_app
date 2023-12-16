import React, { useContext } from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/Search";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart";
import toast from "react-hot-toast";

const SearchProduct = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);
  function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  return (
    <Layout title={"Kết quả tìm kiếm"}>
      <div className="container">
        <div className="text-center">
          <h1>Kết quả tìm kiếm</h1>
          <h6>
            {values?.results.length < 1
              ? "Không tìm thấy sản phẩm"
              : `Tìm thấy ${values?.results.length} sản phẩm`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> {formatCurrency(p.price)}</p>
                  <button
                    onClick={() => navigate(`/product/${p.slug}`)}
                    class="btn btn-primary ms-1"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    onClick={() => {
                      addToCart(p);
                      toast.success("Thêm vào giỏ hàng thành công");
                    }}
                    className="btn btn-secondary ms-1"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchProduct;
