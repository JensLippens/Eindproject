const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  naam: { type: String, required: true },
  omschrijving: { type: String, required: true },
  prijs: { type: Number, required: true },
  verpakking: { type: String, required: true },
  inhoud: { type: Number, required: true },
  categorie: { type: String, required: true },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);
