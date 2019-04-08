const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed, User, Product } = require('./db/models');

app.use(express.json());

app.get('/app.js', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/managers', (req, res, next) => {
  User.findAll().then(users => res.send(users));
});

app.get('/api/products', (req, res, next) => {
  Product.findAll().then(products => res.send(products));
});

app.put('/api/products/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(product => product.update(req.body))
    .then(product => res.send(product))
    .catch(next);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

syncAndSeed();
