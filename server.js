const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maint.hbs',{
//         pageTitle:  'Maintenance Page',
//         currentYear:  new Date().getFullYear(),
//         welcomeMessage:  'Welcome to Our Maintenance Page'
//     });
// });

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle:  'Home Page',
        currentYear:  new Date().getFullYear(),
        welcomeMessage:  'Welcome to Our Home Page'
    });
});

app.get('/about', (req, res) => {
    res.send('About page...');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'bad stuff happened'
    });
});

app.listen(3000);