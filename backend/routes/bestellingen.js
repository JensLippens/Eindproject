const express = require("express");

const BestellingController = require("../controllers/bestellingen");

const router = express.Router();

router.post("", BestellingController.nieuweBestelling);

router.get("", BestellingController.getAlleBestellingen);

router.get("/:id", BestellingController.getEenEnkeleBestelling);

router.delete("/:id",BestellingController.verwijderBestelling);

module.exports = router;

