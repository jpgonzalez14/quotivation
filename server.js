const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const quotes = require('./routes/api/quotes');

const app = express();

//body parser middlewre
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose.connect(db).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

app.get('/', (req,res) => res.send('Hello world'));

//Use Routes
app.use('/api/users', users);
app.use('/api/quotes', quotes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
