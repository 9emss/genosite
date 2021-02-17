const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ejs = require('ejs');


const coRoutes = require('./app/routes/Gemss.Routes');

// Initialize Enverioment
dotenv.config();

// Initialize Server
const app = express();

// Middleware 
app.use(express.json());
app.use(express.static('public'));

// app.use('/css', express.static(path.join(__dirname + '/public/css')));
// app.use('/js', express.static(path.join(__dirname + '/public/js')));
// app.use('/assets', express.static(path.join(__dirname + '/public/assets')));

app.set('views', __dirname + '/app/views/')
app.set('view engine', 'ejs');


app.use('/contacts', coRoutes);

// app.use('/contacts', (req, res) => {
//     // res.sendFile(__dirname + '/app/views/pages/contact.html');
//     res.render('pages/contact.ejs');
// });

// Default URL Website
app.use('/', coRoutes);

// app.use('/', (req, res) => {
//     // res.sendFile(__dirname + '/app/views/pages/index.html');
//     res.render('pages/index');
// });


const server = http.createServer(app);
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`App Runing On Port ${PORT}`));