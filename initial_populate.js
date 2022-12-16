/**
 * Populates the dev testbase with seed from testing.
 */


const seedDatabase = require('./tests/seed');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = 'mongodb://localhost:27017/fiction-finder';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        seedDatabase();
    })
