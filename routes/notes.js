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
        res.status(500).json({ message: "Something went wrong. Please try again later."})
        console.log(`ERROR ${err.status}: ${err}`)
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
        res.status(err.status).json({ message: "Something went wrong. Please try again later."})
        console.log(`ERROR ${err.status}: ${err.error}`)
    })
})

notesRouter.delete('/:noteid', (req, res) => {
    const noteId = req.params.noteid; // convert from URI encoded back to plain text to then convert to json
    removeFromJsonFile('./db/db.json', noteId)
    .then(successMessage => {
        res.json({ message: successMessage })
        console.log(`SUCCESS: ${successMessage}`)
    })
    .catch(err => {
        res.status(err.status).json({ message: "Something went wrong. Please try again later."})
        console.log(`ERROR ${err.status}: ${err.error}`)
    })
})

module.exports = notesRouter;