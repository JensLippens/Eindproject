const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      voornaam: req.body.voornaam,
      naam: req.body.naam,
      straat: req.body.straat,
      huisnummer: req.body.huisnummer,
      gemeente: req.body.gemeente,
      telefoon: req.body.telefoon,
      email: req.body.email,
      password: hash,
      isAdmin: false,
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Ongeldig emailadres"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Ongeldig paswoord"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, user: fetchedUser},
        "zelfgekozen_secret_string_hoe_langer_hoe_veiliger",
        { expiresIn: "10h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 36000, // nummer in seconden, wordt gebruikt voor de frontend
        // userId: fetchedUser._id,
        user: fetchedUser
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Login mislukt"
      });
    });
});

module.exports = router;
