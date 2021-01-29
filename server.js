if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/store', (req, res) => {
  fs.readFile('items.json', (error, data) => {
    if (error) res.status(500).end();
    else {
      /**
       * 2nd param is all diff vars that we want to send to the page
       * in this case its the items
       *
       * Send data parsed in valid JSON and send JSON with name: items down to store.js
       */
      /**
       * While using express, by default, all of my views rendered here need to be in a
       * folder named: views
       */
      res.render('store.ejs', {
        items: JSON.parse(data),
      });
    }
  });
});

app.listen(3000);