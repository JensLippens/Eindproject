const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const klantSchema = new mongoose.Schema({
  voornaam: { type: String, required: true },
  naam: { type: String, required: true },
  straat: { type: String, required: true },
  huisnummer: { type: Number, required: true },
  gemeente: { type: String, required: true },
  telefoon: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

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

bestellingSchema = new mongoose.Schema({
  _id: Number,
  user: {type: klantSchema, required: true},
  orderItems: {type: [orderItemSchema], required: true},
  totaalPrijs: {type: Number, required: true},
}, { _id: false });
bestellingSchema.plugin(AutoIncrement, {start_seq: 1000000});

module.exports = mongoose.model('Bestelling', bestellingSchema);
