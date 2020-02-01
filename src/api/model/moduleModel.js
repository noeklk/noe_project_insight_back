const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
    nom_module: {
        type: String,
        required: true
    },
    id_intervenant: {
        type: String,
        required: "il faut mettre un id aux intervenants"
    },
    id_session: {
        type: String,
        required: "il faut mettre un id à la session"
    },
    date_debut: {
        type: Date
    },
    date_fin: {
        type: Date
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Module', moduleSchema);