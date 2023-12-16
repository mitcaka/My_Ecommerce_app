import React, { useEffect, useState, useContext } from "react";
import Layout from "./../components/Layout/Layout";
import { CartContext } from "../context/cart";
// import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  // const [cart, setCart] = useCart();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  //delete item
  // const removeCartItem = (pid) => {
  //   try {
  //     let myCart = [...cart];
  //     let index = myCart.findIndex((item) => item._id === pid);
  //     myCart.splice(index, 1);
  //     setCart(myCart);
  //     localStorage.setItem("cart", JSON.stringify(myCart));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.product.price * item.quantity;
      });
      return formatCurrency(total);
    } catch (error) {
      console.log(error);
    }
  };
  //get payment gateway
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);
  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      // setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Typography variant="h4" className="text-center">
              {`Xin chào ${auth?.token && auth?.user?.name}`}
            </Typography>
            <Typography variant="h5" className="text-center">
              {cart?.length
                ? `Bạn có ${cart.length} sản phẩm trong giỏ hàng ${
                    auth?.token ? "" : "Hãy đăng nhập để mua hàng"
                  }`
                : " Giỏ hàng của bạn trống"}
            </Typography>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.products._id}`}
                    className="card-img-top"
                    alt={p.products.name}
                    style={{
                      width: "80%",
                      height: "80%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <Typography variant="h5">{p.products.name}</Typography>
                  <p>{p.products.description.substring(0, 50)}</p>
                  <p>
                    Đơn giá : {formatCurrency(p.products.price)} X {p.quantity}
                  </p>
                  <IconButton
                    color="primary"
                    onClick={() => addToCart(p.products)}
                    aria-label="add to shopping cart"
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => removeFromCart(p.products._id)}
                    aria-label="remove to shopping cart"
                  >
                    <RemoveIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Thông tin giỏ hàng</h2>
            <hr />
            <h4>Tổng tiền : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Địa chỉ nhận hàng : </h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/dashboard/user/profile")}
                    color="success"
                  >
                    Cập nhật địa chỉ
                  </Button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Xin hãy đăng nhập để mua hàng
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Đang tiến hành ...." : "Thanh toán thẻ"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
