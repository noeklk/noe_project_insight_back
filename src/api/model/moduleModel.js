const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let moduleSchema = new Schema({
    nom_module: {
      type: String,
      required: true
    },
    id_intervenant: {
      type: String,
      required: "il faut mettre un id aux intervenants"
    },
    session_id: {
      type: String
    },
    date_debut: {
      type: Date,
      default : Date.now
    },
    date_fin: {
      type: Date,
      default : Date.now
    }
  });
  mongoose.model('Module', moduleSchema);
  module.exports = mongoose.model('Module');