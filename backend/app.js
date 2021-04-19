//Yax5NDPmsenkMcY3

const express = require('express');
const mongoose = require('mongoose');

const Product = require("./models/product");

const app = express();


mongoose.connect("mongodb+srv://jens:Yax5NDPmsenkMcY3@webshop.dubxk.mongodb.net/shop-database?retryWrites=true&w=majority")
  .then(() => {
    console.log('Verbinding geslaagd')
  })
  .catch(() => {
    console.log('Verbinding mislukt')
  });

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","*");
  res.setHeader("Access-Control-Allow-Methods","*");
  next();
});

app.post("/api/producten", (req, res, next) => {
  const product = new Product({
    naam: req.body.naam,
    omschrijving: req.body.omschrijving,
    prijs: req.body.prijs,
    verpakking: req.body.verpakking,
    inhoud: req.body.inhoud,
    categorie: req.body.categorie,
  });
  product.save().then(nieuwProduct => {
    console.log(nieuwProduct);
    res.status(201).json({
      message: "Product toegevoegd.",
      productId: nieuwProduct._id
    });
  });
});

app.get("/api/producten", (req, res, next) => {
  Product.find().then(documents => {
    res.status(200).json({
      message: "Producten succesvol opgehaald",
      producten: documents
    });
  });
});

app.delete("/api/producten/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Product verwijderd." });
  });
});

module.exports = app;
