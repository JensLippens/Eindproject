//Yax5NDPmsenkMcY3

const path = require("path");
const express = require('express');
const mongoose = require('mongoose');

const productenRoutes = require("./routes/producten");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://jens:Yax5NDPmsenkMcY3@webshop.dubxk.mongodb.net/shop-database?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log('Verbinding geslaagd')
  })
  .catch(() => {
    console.log('Verbinding mislukt')
  });

app.use(express.json());
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","*");
  res.setHeader("Access-Control-Allow-Methods","*");
  next();
});

app.use("/api/producten", productenRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
