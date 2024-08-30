const express = require("express");
const User = require("../model/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middlewares/authenticateToken.js");

const router = express.Router();

//REGISTER
router.post("/api/users/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  };

  User.create(newUser)
    .then(() => {
      jwt.sign(
        { username: newUser.username },
        process.env.JWT_TOKEN,
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) {
            return res.status(500).json({ msg: "Server Error" });
          }
          res.status(201).json({ token, newUser });
        }
      );
    })
    .catch((error) => {
      res.status(500).json({ msg: "Server Error" });
    });
});

//AUTHENTICATE TOKEN
router.get(
  "/api/users/authenticateToken",
  authenticateToken,
  async (req, res) => {
    User.findOne({ username: req.body.username })
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((error) => {
        res.status(500).json({ message: "Server Error" });
      });
  }
);

//LOGIN
router.get("/api/users/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ msg: "Unauthorized" });
  }

  await User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) return res.status(401).json({ msg: "User not found" });

      bcrypt
        .compare(req.body.password, user.password)
        .then((isMatch) => {
          if (!isMatch) return res.status(400).json({ msg: "Unauthorized" });

          jwt.sign(
            { username: user.username },
            process.env.JWT_TOKEN,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) return res.status(500).json({ msg: "Server error" });

              return res.status(200).json({ token, user });
            }
          );
        })
        .catch((err) => {
          res.status(400).json({ msg: "Unauthorized" });
        });
    })
    .catch();
});

module.exports = router;
