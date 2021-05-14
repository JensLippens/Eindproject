const express = require("express");
const multer = require("multer");

const Product = require("../models/product");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const product = new Product({
      naam: req.body.naam,
      omschrijving: req.body.omschrijving,
      prijs: req.body.prijs,
      verpakking: req.body.verpakking,
      inhoud: req.body.inhoud,
      categorie: req.body.categorie,
      imagePath: url + "/images/" + req.file.filename
    });
    product.save().then(nieuwProduct => {
      res.status(201).json({
        message: "Product toegevoegd",
        product: {
          ...nieuwProduct,
          id: nieuwProduct._id
        }
      });
    });
  }
);

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    const product = new Product({
      _id: req.body.id,
      naam: req.body.naam,
      omschrijving: req.body.omschrijving,
      prijs: req.body.prijs,
      verpakking: req.body.verpakking,
      inhoud: req.body.inhoud,
      categorie: req.body.categorie,
      imagePath: imagePath
    });
    console.log(product);
    Product.updateOne({ _id: req.params.id }, product).then(result => {
      res.status(200).json({ message: "Update geslaagd" });
    });
  }
);

router.get("", (req, res, next) => {
  Product.find().then(documents => {
    res.status(200).json({
      message: "Producten opgehaald",
      producten: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id).then(product => {
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product niet gevonden" });
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Product verwijderd" });
  });
});

module.exports = router;
