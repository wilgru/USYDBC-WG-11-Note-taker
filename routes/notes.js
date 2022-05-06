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
    // readFromJsonFile('./db/db.json').then(data => {
    //     const noteId = JSON.parse(decodeURIComponent(req.params.noteid)); // convert from URI encoded back to plain text to then convert to json
    //     const jsonNotes = JSON.parse(data)

    //     // check if note exists
    //     jsonNotes.forEach(obj => {
    //         if (obj.title === noteId.title && obj.text === noteId.text) { // if note in db matches note to remove, remove it from the database and then re-render the nnotes.html page
    //             removeObj('./db/db.json', obj)
    //             console.log("> Successfuly deleted note")
    //             res.send({message: `Succesfully deleted '${noteId.title}' note`})
    //         } else { // if couldnt find note in db to delete, console.error and then re-render the notes.html page
    //             res.send({message: `Failed to delete '${noteId.title}' note`})
    //             console.log("> Did not find note to remove")
    //         }
    //     })
    // })

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