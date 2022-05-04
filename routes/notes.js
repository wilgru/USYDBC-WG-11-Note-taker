const express = require('express');
const path = require('path');
const { readFromFile, writeToFile, readAndAppend, removeObj } = require('../helpers/fsUtils.js')

const notesRouter = express();

notesRouter.get('/', (req, res) => {
    readFromFile('./db/db.json').then(data => {
        res.json(JSON.parse(data))
    }) 
})

notesRouter.post('/', (req, res) => {
    readAndAppend(JSON.parse(data), './db/db.json')
    res.sendFile(path.join(__dirname, '/../public/notes.html'))
})

notesRouter.delete('/:noteid', (req, res) => {
    readFromFile('./db/db.json').then(data => {
        const noteId = JSON.parse(decodeURIComponent(req.params.noteid));
        const jsonNotes = JSON.parse(data)

        // check if note exists
        jsonNotes.forEach(obj => {
            if (obj.title === noteId.title && obj.text === noteId.text) { // if note exist, remove it from the database and then re-render the nnotes.html page
                removeObj('./db/db.json', obj)
                console.log("Successfuly deleted note")
                res.sendFile(path.join(__dirname, '/../public/notes.html'))
            } else { // if note does not exist, console.error and then re-render the notes.html page
                res.status(500).sendFile(path.join(__dirname, '/../public/notes.html'))
                console.error("Did not find note to remove")
            }
        })
    })
})

module.exports = notesRouter;