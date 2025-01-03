import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "../styles/Homepage.css";
// import { useCart } from "../context/cart";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { cart, addToCart } = useContext(CartContext);
  // const [cart, setCart] = useCart();
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get product
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      console.log(data);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  const fadeImages = [
    {
      url: "https://file.hstatic.net/1000332761/collection/banner_website_do_choi_tre_em_024dca23e61d409dbb18e6463ae7c5e8.jpg",
    },
    {
      url: "https://winfun.vn/media/data/tin-tuc/bannerwinfun1-1392x435.jpg",
    },
  ];
  return (
    <Layout title={"Trang sản phẩm"}>
      <div className="container-fluid row mt-3 justify-content-center home-page">
        <div className="slide-container">
          <Fade>
            {fadeImages.map((fadeImage, index) => (
              <div key={index}>
                <img style={{ width: "100%" }} src={fadeImage.url} />
                <h2>{fadeImage.caption}</h2>
              </div>
            ))}
          </Fade>
        </div>
        <div className="col-md-3">
          <div style={{ border: "1px solid gray", padding: "10px" }}>
            <h4 className="text-center">Tìm theo danh mục</h4>
            <div className="d-flex flex-column p-2">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* price filter */}
            <h4 className="text-center">Tìm theo giá tiền</h4>
            <div className="d-flex flex-column p-2">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column p-2">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                Thiết lập lại
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Tất cả sản phẩm</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "20rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {formatCurrency(p.price)}
                    </h5>
                  </div>
                  <div className="card-name-price">
                    <button
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className="btn btn-primary ms-1"
                    >
                      Chi tiết
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
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning custom-button"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                style={{ width: "200px" }}
              >
                {loading ? "Loading ..." : "Xem thêm"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
