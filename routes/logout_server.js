const express = require("express");
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const cookieParser = require('cookie-parser');

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(cookieParser());


module.exports = (app) => {
    app.get('/logout', (req, res) => {
        res.clearCookie('username');
        console.log(req.cookies);
        res.redirect('/login');
    })
};