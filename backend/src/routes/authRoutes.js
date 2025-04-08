const express = require("express");
const passport = require("passport");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

// Google Login Route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback Route
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const { token, name, email } = req.user;

    const redirectUrl = `http://localhost:5173/oauth-success?token=${token}&name=${encodeURIComponent(
      name
    )}&email=${encodeURIComponent(email)}`;

    res.redirect(redirectUrl);
  }
);

module.exports = router;
