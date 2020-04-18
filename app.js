const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const creds = require("./data/creds");

const errorController = require('./controllers/error');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');
const shopRoutes = require('./routes/shop');

app.use(express.json());
app.use('/api', apiRoutes);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(creds.MONGO_CONNECT_STRING)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

