const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
const path = require('path');
const users = require('../models/users.js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(cookieParser());

const urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = (app) => {
  app.get('/login', (req, res) => {
    res.render('login', {error: false})
})

app.post('/login', urlencodedParser, async (req, res) => {
    const body = JSON.parse(JSON.stringify(req.body));
    try {
      const user = await users.findOne({
        where: {
          username: body.username
        }
      });

      if (user === null) {
        res.render('login', {error: true});
      }

      else if (await bcrypt.compare(body.password, user.password)) {
        res.cookie("username", body.username);
        res.redirect('/home');
      } 
      else {
        res.render('login', {error: true});
       
      }
    }
     catch (e) {
      console.log(e)
    }
}) 
    };