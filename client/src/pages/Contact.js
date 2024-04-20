import React from "react";
import Layout from "../components/Layout/Layout";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import BusinessIcon from "@mui/icons-material/Business";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">Liên hệ</h1>
          <p className="text-justify mt-2"></p>
          <p className="mt-3">
            <AttachEmailIcon fontSize="small" /> : canonvn@gmail.com
          </p>
          <p className="mt-3">
            <ContactPhoneIcon fontSize="small" /> : 0386202101
          </p>
          <p className="mt-3">
            <BusinessIcon fontSize="small" /> : 235 Hoàng Quốc Việt, Cầu Giấy,
            Hà Nội
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
