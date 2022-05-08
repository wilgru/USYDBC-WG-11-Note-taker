const { json } = require('express/lib/response');
const fs = require('fs');
const util = require('util');

// promisify fs.readFile
const readFromJsonFile = util.promisify(fs.readFile);

// promisify fs.writeFile
const writeToJsonFile =  util.promisify(fs.writeFile)

// append content to a JSON file
const appendToJsonFile = (toAppend, file) => {
  return new Promise((resolve, reject) => {
    if (typeof toAppend !== 'object') reject({ status: 500, error: `Parsed content is an incorrect type. Received '${typeof toAppend}' expected 'Object'` })
    readFromJsonFile(file, 'utf8')
    .catch(err =>
      reject({ status: 500, error: err }) // error reading from json file
    )
    .then(data => {
      let jsonData = JSON.parse(data);
      jsonData.push(toAppend);
      writeToJsonFile(file, JSON.stringify(jsonData))
      .then(() => 
        resolve("Note added")
      )
      .catch(err =>
        reject({ status: 500, error: err }) // error writing to json file
      );
    })
  })
};

// remove object from list of objects
const removeFromJsonFile = (file, idToRemove) => {
  return new Promise((resolve, reject) => {
    const noteIdInt = parseInt(idToRemove)
    if (noteIdInt === NaN) reject({status: 400, error: `Parsed content is an incorrect type. Received '${typeof idToRemove}' expected 'number'`})
    readFromJsonFile(file, 'utf8')
    .catch(err =>
      reject({status: 500, error: err}) // error reading from json file
    )
    .then(data => {
      const jsonData = JSON.parse(data);
      let found = false;
      jsonData.forEach((obj, index) => {
        if (obj.id === noteIdInt) {
          jsonData.splice(index, 1);
          found = true;
        }
      });
      if (found) {
        writeToJsonFile(file, JSON.stringify(jsonData))
        .then(() => {
          resolve("Note removed");
        })
        .catch(err =>
          reject({status: 500, error: err})  // error writing to json file
        );
      } else {
        reject({status: 400, error: "Could not find note to delete"})
      }
    })
  })
}

module.exports = { readFromJsonFile, appendToJsonFile, removeFromJsonFile };
