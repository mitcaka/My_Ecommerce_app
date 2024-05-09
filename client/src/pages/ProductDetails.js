import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout/Layout";
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
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(product.price);
  return (
    <Layout>
      <div className="row justify-content-center mt-5">
        <div className="col-md-3">
        <img
          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
          className="card-img-top with-border"
          alt={product.name}
        />

        </div>
        <div className="col-md-6 ">
          <Typography variant="h4" className="p-2">
            {product.name}
          </Typography>
          <Typography variant="h5" className="p-2">
            Giá tiền : <strong>{formattedPrice}</strong>
          </Typography>
          <h6 className="p-2">Danh mục : {product?.category?.name}</h6>
          <button
            onClick={() => {
              addToCart(product);
              toast.success("Thêm vào giỏ hàng thành công");
            }}
            className="btn btn-success ms-1 p-2"
          > 
           🛒 Thêm vào giỏ
          </button><br/>
          <div class="div-khuyen-mai"> 
            <div class="km">📣 ƯU ĐÃI PHÍ SHIP</div> 
            <p>✅<strong>TRỢ PHÍ SHIP TỐI ĐA 15K CHO ĐƠN TỪ 150K</strong></p>
            <p>✅<strong>GIAO HÀNG 3-5 NGÀY (HỖ TRỢ SHIP COD)</strong></p>
            <p>✅<strong>BẢO HÀNH MẢNH GHÉP - GIẤY LẮP RÁP CÁC SẢN PHẨM LEGO</strong></p>
          </div>

        </div>
        <div className="row container justify-content-center mt-5">
          <div className="col-md-2 text-center"  style={{ maxWidth: "100%", overflow: "hidden" }}>
            <img src="/images/2.png" alt="product_photo" style={{ maxWidth: "100%", height: "auto" }}/>
          </div>
          <div className="col-md-8">
            <div className="row container-fluid">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
          
          </div>
          <div className="col-md-2 text-center"  style={{ maxWidth: "100%", overflow: "hidden" }}>
            <img src="/images/3.png" alt="product_photo" style={{ maxWidth: "100%", height: "auto" }}/>
        </div>
            
        </div>

      </div>
      <hr />
      <div className="row justify-content-center mt-5">
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
                <p className="card-text"><strong>{formattedPrice}</strong></p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  Chi tiết
                </button>
                <button class="btn btn-secondary ms-1">Thêm vào giỏ</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default ProductDetails;
