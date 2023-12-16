import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Lấy dữ liệu giỏ hàng từ localStorage khi component được tạo
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Cập nhật giỏ hàng và lưu vào localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (products) => {
    const existingItem = cart.find(
      (item) => item.products._id === products._id
    );
    if (existingItem) {
      const updatedCart = cart.map((item) => {
        if (item.products._id === products._id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { products, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const existingItem = cart.find((item) => item.products._id === productId);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        const updatedCart = cart.map((item) => {
          if (item.products._id === productId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
        setCart(updatedCart);
      } else {
        const updatedCart = cart.filter(
          (item) => item.products._id !== productId
        );
        setCart(updatedCart);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
