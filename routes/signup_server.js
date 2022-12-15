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
    app.get('/signup', (req, res) => {
        if (req.query.username === true) {
            res.render('signup',{username: true});
        }
        else {
            res.render('signup', {username: false});
        }
    })
    
    app.post('/signup', urlencodedParser, async (req, res) => {
        const body = JSON.parse(JSON.stringify(req.body));
        const username = body.username;
        const password = await bcrypt.hash(body.password, 10);
        try {
        var user = await users.findOne({
            where: {
                username: username
            }
        });
    
    
        if (user === null) {
            user = {username: username, password: password};
            await users.create(user);
            res.redirect('/login')
        }
        else {
            res.redirect('/signup?username=false')
        }
    
    }
     catch (e) {
        console.log(e);
     }
    })
    };