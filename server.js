const express = require('express');
const morgan = require('morgan');
const path = require('path');
const api = require('./routes/notes.js');

const PORT = process.env.PORT || 3001;

const app = express();

// middlewares
app.use(express.json())
app.use(morgan('tiny'));

// public pages
app.use(express.static('public'));

// routes
app.use('/api/notes', api);

// endpoint handlers
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);