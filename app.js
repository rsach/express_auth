
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
import logger from 'morgan';
import path from 'path';


var env = process.env.NODE_ENV || "development";
require('dotenv').load();

global.config = require('./config/config.json')[env];
import admin from './routes/admin';
import body_parser from 'body-parser';
var mongoose = require('./db/mongoose');



const app = express();
const debug = Debug('amtica:app');
var cors = require('cors');




app.use(logger('dev'));

app.use(body_parser.json({limit: '4MB'}));
app.use(body_parser.urlencoded({extended: true, limit: '4MB'}));

app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('', admin);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  console.log(err)
  res.status(err.status || 500);
  res.json(err);
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  console.log('Caught exception: %j', err);
  debug('Caught exception: %j', err);
  process.exit(1);
});

console .log("env",env);


export default app;
