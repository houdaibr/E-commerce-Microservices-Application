const axios = require('axios');
const mongoose = require('mongoose');
const Item = require('./models/product');
const uri = 'mongodb://localhost:27017/articles';

async function importData() {
  try {
    const response = await axios.get('https://api.escuelajs.co/api/v1/products');
    const products = response.data;

    const batchSize = 100;
    const delayBetweenBatches = 1000;

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      const batchPromises = batch.map(async (product) => {
        const { id, title, description, images, price, category } = product;

        const newItem = new Item({
          id,
          title,
          description,
          images,
          price,
          category
        });

        return newItem.save();
      });

      await Promise.all(batchPromises);
      await new Promise((resolve) => setTimeout(resolve, delayBetweenBatches));
    }

    console.log('Import des données terminé avec succès !');
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'import des données :', error);
  } finally {
    mongoose.connection.close();
  }
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion réussie à la base de données');
    importData();
  })
  .catch((error) => {
    console.error('Erreur lors de la connexion à la base de données:', error);
  });
