const express = require("express");

const app = express();
const PORT = 3001;


app.use(express.urlencoded({extended: true}));
app.use(express.json());