const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importez le module cors

const items = require('./routes/api/commandes');

const app = express();

app.use(express.json());

app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:5002'], // Autorisez les origines spécifiées
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Autorisez les méthodes spécifiées
        allowedHeaders: ['Content-Type', 'Authorization'], // Autorisez les en-têtes spécifiés
        credentials: true // Autorisez les cookies et les informations d'authentification
      }));


const db = require('./config/key').mongoURI;

mongoose
        .connect(db)
        .then( ()=> console.log('MongoDB Connected ...'))
        .catch( err=> console.log(err));

app.use('/api/commandes', items);

const port = process.env.PORT || 5001;

app.listen(port, ()=> console.log(`Server started on port ${port}`));