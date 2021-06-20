const Product = require("../models/product");

exports.nieuwProduct = (req, res, next) => {
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
  console.log(product);
  product.save().then(nieuwProduct => {
    res.status(201).json({
      message: "Product toegevoegd",
      product: {
        ...nieuwProduct,
        id: nieuwProduct._id
      }
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "Product toevoegen mislukt."
    });
  });
}

exports.updateProduct = (req, res, next) => {
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
  Product.updateOne({ _id: req.params.id }, product).then(result => {
    console.log(result);
    res.status(200).json({ message: "Productupdate geslaagd" });
  })
  .catch(err => {
    res.status(500).json({
      message: "Product updaten mislukt."
    });
  });;
}

exports.getAlleProducten = (req, res, next) => {
  Product.find().sort("naam").then(productenData => {
    res.status(200).json({
      message: "Producten opgehaald",
      producten: productenData,
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "Producten ophalen mislukt"
    });
  });;
}

exports.getEenEnkelProduct = (req, res, next) => {
  Product.findById(req.params.id).then(product => {
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product niet gevonden" });
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "Product ophalen mislukt door technisch probleem"
    });
  });;
}

exports.verwijderProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Product verwijderd" });
  })
  .catch(err => {
    res.status(500).json({
      message: "Product verwijderen mislukt"
    });
  });
}
