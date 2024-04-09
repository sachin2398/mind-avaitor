// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const productController = require("../controllers/productControllers/productController");

router.get("/products",
    authenticateToken,
    productController.getAllProducts);
router.get(
  "/products/:id",
  authenticateToken,
  productController.getProductById
);
router.post(
  "/products",
  authenticateToken,
  authorizeAdmin,
  productController.addProduct
);
router.put(
  "/products/:id",
  authenticateToken,
  authorizeAdmin,
  productController.updateProduct
);
router.delete(
  "/products/:id",
  authenticateToken,
  authorizeAdmin,
  productController.deleteProduct
);

// Middleware to authorize only admin
function authorizeAdmin(req, res, next) {
  const { role } = req.user;
  if (role !== "admin") {
    return res
      .status(403)
      .json({ message: "Only admin can perform this operation" });
  }
  next();
}

module.exports = router;
