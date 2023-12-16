import express from "express";
import {
  register,
  login,
  test,
  forgotPassword,
  updateProfile,
  getOrders,
  getAllOrders,
  orderStatusController,
  getAllUsers,
  getBudget,
  countSuccsessOrder,
  totalMoney,
  calculate12Months,
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

//route object
const router = express.Router();

//routing
//RESGISTER || METHOD POST
router.post("/register", register);

//LOGIN || POST
router.post("/login", login);

//Forgot password || POST
router.post("/forgot-password", forgotPassword);

//test routes
router.get("/test", requireSignIn, isAdmin, test);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfile);

//orders
router.get("/orders", requireSignIn, getOrders);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrders);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

//all orders
router.get("/all-users", requireSignIn, isAdmin, getAllUsers);

//budget
router.get("/budget", requireSignIn, isAdmin, getBudget);

//StatisUser
router.get("/susscess-order", requireSignIn, isAdmin, countSuccsessOrder);

router.get("/total-money", requireSignIn, isAdmin, totalMoney);

router.get("/total-12month", requireSignIn, isAdmin, calculate12Months);

export default router;
