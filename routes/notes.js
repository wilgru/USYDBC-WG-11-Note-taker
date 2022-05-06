const express = require('express');
const path = require('path');
const { readFromJsonFile, appendToJsonFile, removeFromJsonFile } = require('../helpers/fsUtils.js')

const notesRouter = express();

notesRouter.get('/', (req, res) => {
    readFromJsonFile('./db/db.json')
    .then(data => {
        res.json(JSON.parse(data))
    })
    .catch(err => {
        res.json({ message: err})
        console.log(`ERROR: ${err}`)
    })
})

notesRouter.post('/', (req, res) => {
    appendToJsonFile(req.body, './db/db.json')
    .then(successMessage => {
        // res.sendFile(path.join(__dirname, '/../public/notes.html'))
        res.json({ message: successMessage })
        console.log(`SUCCESS: ${successMessage}`)
    })
    .catch(err => {
        res.json({ message: err})
        console.log(`ERROR: ${err}`)
    })
})

notesRouter.delete('/:noteid', (req, res) => {
    const noteToRemove = JSON.parse(decodeURIComponent(req.params.noteid)); // convert from URI encoded back to plain text to then convert to json
    removeFromJsonFile('./db/db.json', noteToRemove)
    .then(successMessage => {
        res.json({ message: successMessage })
        console.log(`SUCCESS: ${successMessage}`)
    })
    .catch(err => {
        res.json({ message: err})
        console.log(`ERROR: ${err}`)
    })
})

module.exports = notesRouter;