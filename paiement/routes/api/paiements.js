const express = require('express');
const axios = require('axios');
const router = express.Router();

const Paiement = require('../../models/paiement');


// Effectuer un paiement pour une commande
router.post('/', async (req, res) => {
  try {
    const { commandeId, montant } = req.body; // Obtenir l'ID de la commande et le montant du corps de la requête

    // Envoyer une requête au microservice commande pour marquer la commande comme payée
    const response = await axios.put(`http://localhost:5001/api/commandes/${commandeId}/paiement`, {
      montant,
    });

    if (response.status === 200) {
      // Le paiement a réussi
      res.json({ success: true, message: 'Le paiement a été effectué avec succès' });
    } else {
      // La mise à jour de la commande a échoué
      res.json({ success: false, message: 'La mise à jour de la commande a échoué' });
    }
  } catch (error) {
    console.error('Erreur lors du paiement de la commande:', error);
    res.status(500).json({ error: 'Erreur lors du paiement de la commande' });
  }
});






// Obtenir tous les paiements
router.get('/', async (req, res) => {
    try {
      const paiements = await Paiement.find();
      res.json(paiements);
    } catch (error) {
      console.error('Erreur lors de la récupération des paiements :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des paiements' });
    }
  });

// Obtenir un paiement par son ID
router.get('/:id', async (req, res) => {
  try {
    const paiement = await Paiement.findById(req.params.id);
    if (!paiement) {
      return res.status(404).json({ error: 'Paiement non trouvé' });
    }
    res.json(paiement);
  } catch (error) {
    console.error('Erreur lors de la récupération du paiement :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du paiement' });
  }
});


module.exports = router;
