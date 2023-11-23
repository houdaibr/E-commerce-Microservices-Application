const express = require('express');
const router = express.Router();
const Commande = require('../../models/commande');

// Créer une commande
router.post('/', async (req, res) => {
    try {
      const commandes = req.body; // Obtenir la liste des commandes du corps de la requête
      
      if (!Array.isArray(commandes)) {
        return res.status(400).json({ error: 'Le corps de la requête doit contenir un tableau de commandes' });
      }
      
      const nouvellesCommandes = commandes.map(({ id, idProduct }) => ({ id, idProduct }));
      const commandesCreees = await Commande.insertMany(nouvellesCommandes);
      
      res.json(commandesCreees);
    } catch (error) {
      console.error('Erreur lors de la création des commandes:', error);
      res.status(500).json({ error: 'Erreur lors de la création des commandes' });
    }
  });
  
  router.post('/add-to-cart', async (req, res) => {
    try {
      const { productId } = req.body;
      const userId = localStorage.getItem('user'); // Fetch the user ID from localStorage
      if (!userId) {
        return res.status(400).json({ error: 'User not logged in' });
      }
  
      // Fetch the user's cart by their ID and update it with the new product
      const userCart = await Cart.findOneAndUpdate(
        { userId }, // Adjust with your user and cart schema
        { $push: { products: productId } }, // Push the product ID into the user's cart
        { new: true, upsert: true }
      );
  
      if (!userCart) {
        return res.status(500).json({ error: 'Could not add product to the cart' });
      }
  
      res.json({ message: 'Product added to the cart' });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).json({ error: 'Error adding product to cart' });
    }
  });
  

// Récupérer toutes les commandes
router.get('/', async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.json(commandes);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
  }
});

// Récupérer une commande par ID
router.get('/:id', async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }
    res.json(commande);
  } catch (error) {
    console.error('Erreur lors de la récupération de la commande:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la commande' });
  }
});


  
// Mettre à jour le paiement d'une commande
router.put('/:id/paiement', async (req, res) => {
  try {
    const { id } = req.params;
    const { montant } = req.body;

    // Mettez en œuvre votre logique de mise à jour de l'état de la commande ici
    // par exemple, vous pouvez rechercher la commande dans la base de données par son ID
    // puis mettre à jour le champ de paiement de la commande avec le montant spécifié

    const commande = await Commande.findById(id);
    
    if (!commande) {
      return res.status(404).json({ error: 'La commande n\'existe pas' });
    }

    commande.paiement = montant; // Mettez à jour le champ de paiement de la commande
    await commande.save(); // Enregistrez les modifications dans la base de données

    res.json({ message: 'Le paiement de la commande a été mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du paiement de la commande:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du paiement de la commande' });
  }
});




  
  
// Supprimer une commande
router.delete('/:id', async (req, res) => {
  try {
    const commandeSupprimee = await Commande.findByIdAndRemove(req.params.id);
    if (!commandeSupprimee) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }
    res.json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la commande:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la commande' });
  }
});


module.exports = router;