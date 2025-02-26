const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Usuarios", usuariosSchema);
