const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'jade');
app.use('/uploads', express.static('uploads'));

app.use('/api', require('./routes'))

if(!fs.existsSync('uploads')){
  fs.mkdirSync('uploads');
}


module.exports = app;
