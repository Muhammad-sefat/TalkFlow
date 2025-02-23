const express = require("express");
const {
  sendFriendRequest,
  acceptFriendRequest,
  getFriends,
  getPendingRequests,
} = require("../controllers/friendController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/send", protect, sendFriendRequest);
router.post("/accept/:id", protect, acceptFriendRequest);
router.get("/list", protect, getFriends);
router.get("/requests", protect, getPendingRequests);

module.exports = router;
