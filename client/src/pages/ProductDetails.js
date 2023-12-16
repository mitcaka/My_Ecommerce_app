import React, { useEffect, useState, useContext } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { CartContext } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);
  function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  //init product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      console.log(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container justify-content-center mt-5">
        <div className="col-md-4">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 ">
          <Typography variant="h4" className="p-2">
            {product.name}
          </Typography>
          <Typography variant="body1" className="p-2">
            {product.description}
          </Typography>
          <Typography variant="h5" className="p-2">
            Giá tiền : <strong>{product.price}</strong>
          </Typography>
          <h6 className="p-2">Danh mục : {product?.category?.name}</h6>
          <button
            onClick={() => {
              addToCart(product);
              toast.success("Thêm vào giỏ hàng thành công");
            }}
            className="btn btn-danger ms-1 p-2"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Sản phẩm tương tự</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">Không tìm thấy sản phẩm tương tự</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text">$ {p.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button class="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
