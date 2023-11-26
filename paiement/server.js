const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const items = require('./routes/paiement');

const app = express();

app.use(express.json());

// Add the CORS headers middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });


  const db = require('./config/key').mongoURI;
  mongoose
        .connect(db)
        .then( ()=> console.log('MongoDB Connected ...'))
        .catch( err=> console.log(err));
app.use('/api/paiements', items);

const port = process.env.PORT || 5002;

app.listen(port, ()=> console.log(`Server started on port ${port}`));
