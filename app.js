const express = require("express");
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const cookieParser = require('cookie-parser');

const port = 4001;

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(cookieParser())

require('./routes/login_server')(app);
require('./routes/signup_server')(app);
require('./routes/form_server')(app);
require('./routes/logout_server')(app);
require('./routes/history_server')(app);

app.get('/home', (req, res) => {
    if (req.cookies.username === undefined) {
        res.redirect('/login');
    }
    else {
        res.render('home');
    }
})

app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}!`)
})
