if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engine', 'ejs');
//app.engine('ejs', require('ejs').__express);
app.use(express.json());
app.use(express.static('public'));

app.get('/store', (req, res) => {
  fs.readFile('./items.json', (error, data) => {
    if (error) {
      res.status(500).end();
    } else {
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
      /**
       * Items are rendered server-side, which means server has total control on what items
       * the front-end uses and also has control on what items is sent back to the user to
       * determine the total price, so the user can't fake a $0 charge as the server will
       * know that the items do not add up to $0
       */
      res.render('store.ejs', {
        items: JSON.parse(data),
      });
    }
  });
});

app.listen(3000);
