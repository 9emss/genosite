const express = require("express");
const path = require("path");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ejs = require("ejs");

// Routes
const gemssRoutes = require("./app/routes/Gemss.Routes");
const blogRoutes = require("./app/routes/Blog.Routes");

// Initialize Enverioment
dotenv.config();

// Initialize Server
const app = express();

// Connect to MongoDB
const MONGO = process.env.DB_CONNECT;

mongoose.connect(
    MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    console.log('Connected To DB!')
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use('/public', express.static('public'))

app.set("views", __dirname + "/app/views/");
app.set("view engine", "ejs");

// Default URL Website
app.use("/", gemssRoutes);
app.use("/blog", blogRoutes);

const server = http.createServer(app);
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`App Runing On Port ${PORT}`));