const express = require("express");
const { getUser, updateUser } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:id", protect, getUser);
router.put("/:id", protect, updateUser);

module.exports = router;
