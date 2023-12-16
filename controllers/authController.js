import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import moment from "moment";

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }

    if (!answer) {
      return res.send({ message: "answer is required" });
    }

    //check user
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already register please login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User register successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
    });
  }
};

//POST LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid name or email",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email is not register",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({
        message: "Please enter your email",
      });
    }
    if (!newPassword) {
      res.status(400).send({
        message: "Please enter your new password",
      });
    }
    if (!answer) {
      res.status(400).send({
        message: "Please enter your answer",
      });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrong email or answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Some thing went wrong",
      error,
    });
  }
};

export const test = async (req, res) => {
  res.send("protected routes");
};

//update profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Update profile",
      error,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("orderItems.product", "-photo")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("orderItems.product", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({ role: 0 });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders",
      error,
    });
  }
};

export const getBudget = async (req, res) => {
  try {
    console.log("Dang tinh toan");
    const currentDate = new Date();
    const currentMonthFirstDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const currentMonthLastDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const previousMonthFirstDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const previousMonthLastDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    const currentMonthOrders = await orderModel
      .find({
        createdAt: {
          $gte: currentMonthFirstDate,
          $lte: currentMonthLastDate,
        },
      })
      .populate("orderItems.product");
    const currentMonthProfit = currentMonthOrders.reduce(
      (totalProfit, order) => {
        const orderProfit = order.orderItems.reduce((subtotalProfit, item) => {
          const productProfit = item.product.price;
          return subtotalProfit + productProfit;
        }, 0);
        return totalProfit + orderProfit;
      },
      0
    );

    const previousMonthOrders = await orderModel
      .find({
        createdAt: {
          $gte: previousMonthFirstDate,
          $lte: previousMonthLastDate,
        },
      })
      .populate("orderItems.product");
    const previousMonthProfit = previousMonthOrders.reduce(
      (totalProfit, order) => {
        const orderProfit = order.orderItems.reduce((subtotalProfit, item) => {
          const productProfit = item.product.price;
          return subtotalProfit + productProfit;
        }, 0);
        return totalProfit + orderProfit;
      },
      0
    );

    const profitDifferencePercentage =
      ((currentMonthProfit - previousMonthProfit) / previousMonthProfit) * 100;
    const budget = [
      currentMonthProfit,
      previousMonthProfit,
      profitDifferencePercentage,
    ];
    res.json(budget);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders",
      error,
    });
  }
};

export const countSuccsessOrder = async (req, res) => {
  let percent = 0;
  try {
    const countSuccessfulOrders = async () => {
      try {
        const totalOrders = await orderModel.countDocuments();
        const successfulOrders = await orderModel.countDocuments({
          status: "Đã nhận hàng",
        });

        const successRate = (successfulOrders / totalOrders) * 100;
        percent = successRate.toFixed(2);
        console.log("So don hàng" + totalOrders);
        console.log("So don hàng thành công" + successfulOrders);
        console.log(`Tỷ lệ đơn hàng thành công ac: ${percent}%`);
        res.json(percent);
      } catch (error) {
        console.error("Lỗi khi đếm số lượng đơn hàng thành công:", error);
      }
    };
    countSuccessfulOrders();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders",
      error,
    });
  }
};

export const totalMoney = async (req, res) => {
  try {
    const pipeline = [
      {
        $match: { status: "Đã nhận hàng" },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $lookup: {
          from: "products",
          localField: "orderItems.product",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
      {
        $group: {
          _id: "$_id",
          totalPrice: {
            $sum: {
              $multiply: ["$productInfo.price", "$orderItems.quantity"],
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ];

    const result = await orderModel.aggregate(pipeline);

    if (result.length > 0) {
      const totalRevenue = result[0].totalRevenue;
      console.log("Tổng tiền: " + totalRevenue);
      res.json(totalRevenue);
    } else {
      console.log("Không có đơn hàng thành công.");
      res.json(0);
    }
  } catch (error) {
    console.error(
      "Lỗi khi tính tổng số tiền từ các đơn hàng thành công:",
      error
    );
    res.status(500).send({
      success: false,
      message: "Lỗi khi tính tổng số tiền từ các đơn hàng thành công",
      error,
    });
  }
};

export const calculate12Months = async (req, res) => {
  try {
    const twelveMonthsAgo = moment().subtract(12, "months").startOf("month");
    const currentMonth = moment().startOf("month");

    const months = [];
    let monthCursor = moment(twelveMonthsAgo);
    while (monthCursor.isSameOrBefore(currentMonth)) {
      months.push(monthCursor.format("YYYY-MM"));
      monthCursor.add(1, "month");
    }

    const pipeline = [
      {
        $match: {
          status: "Đã nhận hàng",
          createdAt: { $gte: twelveMonthsAgo.toDate() },
        },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $lookup: {
          from: "products",
          localField: "orderItems.product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $addFields: {
          totalPrice: {
            $multiply: [
              "$orderItems.quantity",
              { $arrayElemAt: ["$product.price", 0] },
            ],
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];

    const result = await orderModel.aggregate(pipeline);

    const revenueByMonth = months.reduce((acc, month) => {
      const foundMonth = result.find((item) => item._id.month === month);
      acc[month] = foundMonth ? foundMonth.totalRevenue : 0;
      return acc;
    }, {});
    const dataArray = Object.entries(revenueByMonth).map(([key, value]) => ({
      key,
      value,
    }));
    res.json(dataArray);
  } catch (error) {
    console.error("Lỗi khi tính tổng doanh thu:", error);
    res.status(500).send({
      success: false,
      message: "Lỗi khi tính tổng doanh thu",
      error,
    });
  }
};
