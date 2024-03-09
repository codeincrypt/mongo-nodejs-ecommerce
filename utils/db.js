const mongoose = require('mongoose');
const config = require('./config');

let db, uri, options

const username = encodeURIComponent(config.DB_USER);
const password = encodeURIComponent(config.DB_PASS);
const cluster = config.DB_HOST;
const dbname = config.DB_NAME;

const SERVER = config.NODE_ENV

if(SERVER.toLowerCase() === 'localhost' || 
  SERVER.toLowerCase() === 'local' || 
  SERVER.toLowerCase() === 'dev' || 
  SERVER.toLowerCase() === 'development')
{
  uri = `mongodb://localhost:27017/${dbname}`;
  options = {
    useNewUrlParser: true
  }

} else {
  uri = `mongodb+srv://${username}:${password}@${cluster}/${dbname}`;
  options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  
}
mongoose.connect(uri, options)
.then(() => {
  db = mongoose.connection
  console.log('Mongo DB Connected Successfully ')
})
.catch((err) => {
  db = err;
  console.error('Not Connected', err)
});

module.exports = db;