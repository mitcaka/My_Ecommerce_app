import express from "express";
import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
import {
  category,
  createCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "./../controllers/categoryController.js";

const router = express.Router();

//routes
//create category
router.post("/create-category", requireSignIn, isAdmin, createCategory);

//update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategory);

//get all category
router.get("/get-category", category);

//get category by id
router.get("/get-category/:id", getCategoryById);

//delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategory);

export default router;
