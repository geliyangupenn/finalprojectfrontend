const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require('cors');

app.use(cors())

const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


// mongodb connection
const password = "N2NgeU0LIGKHerC3";
const user = "fsanal"
const dbName = "test";
const dbRoute = `mongodb+srv://${user}:${password}@cis557projectdb.aolme.mongodb.net/${dbName}?retryWrites=true&w=majority`

/*
if (process.env.USE_EXTERNAL_DB == 0) {
    dbRoute = 'mongodb://127.0.0.1:27017?retryWrites=true&w=majority'
}
*/

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const routes = require("./routes/routes");
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server running on port:${port}`);
});

