const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  voornaam: { type: String, required: true },
  naam: { type: String, required: true },
  straat: { type: String, required: true },
  huisnummer: { type: Number, required: true },
  gemeente: { type: String, required: true },
  telefoon: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin:{ type: Boolean, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
