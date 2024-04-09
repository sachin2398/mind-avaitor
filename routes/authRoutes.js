
const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const signupController = require("../controllers/authControllers/signupController");
const loginController = require("../controllers/authControllers/loginController");

router.post("/signup", signupController);
router.post("/login", loginController);

router.get("/admin-only", authenticateToken, (req, res) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res
      .status(403)
      .json({ message: "You do not have permission to access this resource" });
  }
  res.json({ message: "You accessed an admin-only route" });
});

module.exports = router;
