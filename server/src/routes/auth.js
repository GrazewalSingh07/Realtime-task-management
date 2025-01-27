const express = require("express");
const { register, login, logout, checkAuth } = require("../controller/authentication");

const router = express.Router();

// Register route
router.post("/register", register);
// Login route
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", checkAuth);
module.exports = router;