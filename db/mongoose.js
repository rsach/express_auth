var mongoose = require('mongoose');
var env = process.env.NODE_ENV || "development";
var dbconfig = require('../config/database.json')[env];
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.mongodb_uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('we are connected to mongodb!');
});
mongoose.set('debug', false);

module.exports = {mongoose};
