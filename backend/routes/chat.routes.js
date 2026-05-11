const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const { sendMessage } = require("../controllers/chat.controller");

router.post("/send", protect, sendMessage);

module.exports = router;