import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);
    count === 0 &&
      navigate("/login", {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <>
      <div
        className="d-flex justify-content-center align-item-center"
        style={{ height: "70vh" }}
      >
        <h1 class="Text-center"> redirecting to you in {count} s</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
