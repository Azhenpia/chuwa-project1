const express = require("express");
const { addProduct, updateProduct, deleteProduct, getProducts } = require("../controllers/productController");
const authToken = require("../middleware/auth");

const router = express.Router();

// Middleware to check admin role
const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// Routes
router.get("/", getProducts); // Public route to get products
router.post("/", authToken, isAdmin, addProduct); // Protected route for adding products
router.put("/:id", authToken, isAdmin, updateProduct); // Protected route for updating products
router.delete("/:id", authToken, isAdmin, deleteProduct); // Protected route for deleting products

module.exports = router;

