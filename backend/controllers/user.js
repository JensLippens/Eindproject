const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.nieuweUser = (req, res, next) => {
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
          message: "Nieuwe user aangemaakt",
          result: result,
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Emailadres bestaat al",
        });
      });
  });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "E-mailadres niet gevonden"
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
        process.env.JWT_KEY,
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
}

exports.updateUser = (req, res, next) => {
  const user = new User({
    _id: req.body._id,
    voornaam: req.body.voornaam,
    naam: req.body.naam,
    straat: req.body.straat,
    huisnummer: req.body.huisnummer,
    gemeente: req.body.gemeente,
    telefoon: req.body.telefoon,
    email: req.body.email,
    password: req.body.password,
    isAdmin: false,
  });
  User.updateOne({ _id: req.params.id }, user)
    .then(result => {
      console.log(result);
      res.status(200).json({ message: "Klantupdate geslaagd" });
    })
    .catch(err => {
      res.status(500).json({
        message: "Update mislukt",
      });
    });
}
