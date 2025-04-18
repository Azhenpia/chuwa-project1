const express = require("express");
const { generateRegistrationToken, registerUser } = require("../controllers/registrationController");
const router = express.Router();

// HR生成注册令牌
router.post("/generate-token", generateRegistrationToken);

// 员工注册
router.post("/register", registerUser);
module.exports = router;
