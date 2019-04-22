// require('dotenv').config()

const express = require('express');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const routes = require('./routes');
const cors = require('cors');

mongoose.connect(`mongodb://localhost/e-commerce-test`, { useNewUrlParser: true });


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use('/', routes);



app.listen(port, () => {
    console.log(`server is running in port ${port}`)
})

module.exports = app;