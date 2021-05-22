const mongoose = require('mongoose');
const product = require('./product');

const productSchema = new mongoose.Schema({
  naam: { type: String, required: true },
  omschrijving: { type: String, required: true },
  prijs: { type: Number, required: true },
  verpakking: { type: String, required: true },
  inhoud: { type: Number, required: true },
  categorie: { type: String, required: true },
  imagePath: { type: String, required: true },
});

const orderItemSchema = new mongoose.Schema({
  product: {type: productSchema, required: true},
  aantal: {type: Number, required: true},
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
