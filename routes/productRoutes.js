import express from "express";
import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
import {
  createProduct,
  getProduct,
  getSingleProduct,
  productPhoto,
  deleteProduct,
  updateProduct,
  productFilters,
  productCount,
  productList,
  searchProduct,
  realtedProduct,
  productCategory,
  braintreeToken,
  braintreePayment,
  orderPayment,
  payosPayment,
  receiveHook,
} from "./../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProduct
);

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProduct
);

//get product
router.get("/get-product", getProduct);

//single product
router.get("/get-product/:slug", getSingleProduct);

//get photo
router.get("/product-photo/:pid", productPhoto);

//detele product
router.delete("/delete-product/:pid", requireSignIn, isAdmin, deleteProduct);

//product filter
router.post("/product-filters", productFilters);

//product count
router.get("/product-count", productCount);

//product per page
router.get("/product-list/:page", productList);

//search product
router.get("/search/:keyword", searchProduct);

//similar product
router.get("/related-product/:pid/:cid", realtedProduct);

//category wise product
router.get("/product-category/:slug", productCategory);

//payment route
//token
router.get("/braintree/token", braintreeToken);

//payments brainTree
router.post("/braintree/payment", requireSignIn, braintreePayment);

router.post("/payment", requireSignIn, orderPayment);

//payment payos
router.post("/create-payment-link",requireSignIn, payosPayment);

//https://871c-2001-ee0-8206-5227-a9ca-bbc0-38b6-c976.ngrok-free.app/api/v1/product/receive-hook
router.post("/receive-hook", receiveHook);

export default router;
