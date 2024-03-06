const mongoose = require('mongoose');
require('dotenv').config();

let db
let uri
let options

const username = encodeURIComponent(process.env.DB_USER);
const password = encodeURIComponent(process.env.DB_PASS);
const cluster = process.env.DB_HOST;
const dbname = process.env.DB_NAME;

const SERVER = process.env.NODE_ENV
console.log('SERVER', SERVER)
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
  console.log('Mondo DB Connected Successfully ')
})
.catch((err) => {
  db = err;
  console.error('Not Connected', err)
});

module.exports = db;