const express = require('express');


const items = require('./routes/api/paiements');

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


app.use('/api/paiements', items);

const port = process.env.PORT || 5002;

app.listen(port, ()=> console.log(`Server started on port ${port}`));