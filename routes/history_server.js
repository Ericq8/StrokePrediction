const express = require("express");
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const history = require('../models/history.js');
const cookieParser = require('cookie-parser');

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(cookieParser());

module.exports = (app) => {
    app.get('/history', async(req, res) => {
        const username = req.cookies.username;
        if (username === undefined) {
            res.redirect('/login');
        }
        else {
            try {
                const results = await history.findAll({
                    where: {
                        username: username
                    }
                });

                const histories = [];

                for (let i = 0; i < results.length; i++) {
                    histories.push(results[i].dataValues);
                }
                res.render('history', {histories: histories});
            }
             catch (e) {
                console.log(e);
             }
        }
    });

    app.post('/history', async(req, res) => {
        const username = req.cookies.username;
            try {
                await history.destroy({
                    where: {
                        username: username
                    }
                });

                res.redirect('/history');
            }
             catch (e) {
                console.log(e);
             }
        }
    );

    };