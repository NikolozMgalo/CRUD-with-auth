const mongoose = require('mongoose');
const mongoDB = 'mongodb://<username>:<userpassword>@ds129914.mlab.com:29914/auth';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = mongoose;
//const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
