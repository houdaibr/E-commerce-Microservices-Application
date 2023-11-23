const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaiementSchema = new Schema({
  commandeId: {
    type: String,
    required: true
  },
  datePaiement: {
    type: Date,
    default: Date.now
  },
  montant: {
    type: Number,
    required: true
  },
  // Autres propriétés de paiement
});

const Paiement = mongoose.model('paiement', PaiementSchema);

module.exports = Paiement;
