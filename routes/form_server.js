const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
const path = require('path');
const history = require('../models/history.js');
const cookieParser = require('cookie-parser');

const axios = require('axios');
const { Sequelize } = require("sequelize");

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(cookieParser());

const urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = (app) => {
    app.get('/form', (req, res) => {
        if (req.cookies.username === undefined) {
            res.redirect('/login');
        }
        else {
            res.render('form')
        }
    })
    
    app.post('/form', urlencodedParser, async(req, res) => {
        const body = JSON.parse(JSON.stringify(req.body));
        axios.get(`http://localhost:8000/predict?age=${body.age}&gender=${body.gender}&hypertension=${body.hypertension}&heart_disease=${body.heart_disease}&ever_married=${body.ever_married}&work_type=${body.work_type}&residence_type=${body.residence_type}&avg_glucose_level=${body.avg_glucose_level}&bmi=${body.bmi}&smoking_status=${body.smoking_status}`)
        .then(async(response) => {
            const result = response.data.prediction;
            const username = req.cookies.username;
            new_history = {username: username, prediction: result, time: Sequelize.fn('NOW')};
            await history.create(new_history);
            res.render('result', {prediction : result})
        });
    })
    };