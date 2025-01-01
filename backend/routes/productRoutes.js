const express = require("express");
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController"); // 引入控制器方法

const router = express.Router();

// 路由定义
router.get("/", getProducts); // 获取所有产品
router.post("/", addProduct); // 添加产品
router.put("/:id", updateProduct); // 更新产品
router.delete("/:id", deleteProduct); // 删除产品

module.exports = router;
