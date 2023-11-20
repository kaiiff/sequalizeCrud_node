const express = require("express");
const { registerUser, loginUser } = require("../controller/userController");
const router = express.Router();

router.post("/addUser", registerUser);
router.post("/loginUser", loginUser);

module.exports = router;
