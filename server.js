const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 5001;


app.listen(port, () => console.log(`listening on pfshfy dsgdort ${port}`));