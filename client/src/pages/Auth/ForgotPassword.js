import React, { useState } from "react";
import Layout from "./../../components/Layout/layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate(location.state || "/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("error somthing");
    }
    console.log(process.env.REACT_APP_API);
  };
  return (
    <Layout title="Login">
      <div className="register">
        <div className="form-container ">
          <form onSubmit={handleSubmit}>
            <h4 className="title">FORGOR PASSWORD FORM</h4>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Email "
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your New Password"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter your best friend name "
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              RESET
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
