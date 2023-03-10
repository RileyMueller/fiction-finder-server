const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Sending this url to MongoDBCompass will allow you to easily view the DB
const url = 'mongodb://localhost:27017/fiction-finder';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Bind connection to error event (to get notification of connection errors)
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = require('./server');

const port = 4000;

// You do not need to listen for tests? So its done here
app.listen(port, () => {
    console.log(`Node.js server listening on port ${port}`);
});
