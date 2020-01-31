const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sessionSchema = new Schema({
  nom_promo: {
    type: String,
    required: true
  },
  annee_promo: {
    type: Date,
    required : true
  }
});

mongoose.model('Session', sessionSchema);

module.exports = mongoose.model('Session');