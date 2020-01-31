const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sessionSchema = new Schema({
  nom_promo: {
    type: String,
    required: true
  },
  annee_promo: {
    type: Date,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Session', sessionSchema);