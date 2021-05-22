const Bestelling = require("../models/bestelling");

exports.nieuweBestelling = (req, res, next) => {
  const bestelling = new Bestelling({
    user: req.body.user,
    orderItems: req.body.orderItems,
    totaalPrijs: req.body.totaalPrijs,
  });
  bestelling.save().then(nieuweBestelling => {
    res.status(201).json({
      message: "Bestelling toegevoegd",
      bestelling: nieuweBestelling
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "Bestelling toevoegen mislukt"
    });
  });
}

exports.getAlleBestellingen = (req, res, next) => {
  Bestelling.find().then(opgehaaldeBestellingen => {
    res.status(200).json({
      message: "Bestellingen opgehaald",
      bestellingen: opgehaaldeBestellingen
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "Bestellingen opvragen mislukt"
    });
  });
}

exports.getEenEnkeleBestelling = (req, res, next) => {
  Bestelling.findById(req.params.id).then(gevondenBestelling => {
    if (gevondenBestelling) {
      res.status(200).json(gevondenBestelling);
    } else {
      res.status(404).json({ message: "Bestelling niet gevonden" });
    }
  })
  .catch(err => {
    res.status(500).json({
      message: "Bestelling ophalen mislukt"
    });
  });
}

exports.verwijderBestelling = (req, res, next) => {
  Bestelling.deleteOne({ _id: req.params.id }).then(result => {
    // console.log(result);
    res.status(200).json({ message: "Product verwijderd" });
  })
  .catch(err => {
    res.status(500).json({
      message: "Bestelling verwijderen mislukt"
    });
  });
}
