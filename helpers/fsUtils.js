const fs = require('fs');
const util = require('util');

// promisify fs.readFile
const readFromJsonFile = util.promisify(fs.readFile);

// promisify fs.writeFile
const writeToJsonFile =  util.promisify(fs.writeFile)

// append content to a JSON file
const appendToJsonFile = (toAppend, file) => {
  return new Promise((resolve, reject) => {
    if (typeof toAppend !== 'object') reject(`Parsed content is an incorrect type. Received '${typeof toAppend}' expected 'Object'`)
    readFromJsonFile(file, 'utf8')
    .catch(err =>
      reject(err) // error reading from json file
    )
    .then(data => {
      let jsonData = JSON.parse(data);
      jsonData.push(toAppend);
      writeToJsonFile(file, JSON.stringify(jsonData))
      .then(() => 
        resolve("Note added successfully")
      )
      .catch(err =>
        reject(err) // error writing to json file
      );
    })
  })
};

// remove object from list of objects
const removeFromJsonFile = (file, toRemove) => {
  return new Promise((resolve, reject) => {
    if (typeof toRemove !== 'object') reject(`Parsed content is an incorrect type. Received '${typeof toRemove}' expected 'Object'`)
    readFromJsonFile(file, 'utf8')
    .catch(err =>
      reject(err) // error reading from json file
    )
    .then(data => {
      const jsonData = JSON.parse(data);
      let found = false;
      jsonData.forEach((obj, index) => {
        if (obj.title == toRemove.title && obj.text == toRemove.text) {
          jsonData.splice(index);
          found = true;
        }
      });
      if (found) {
        writeToJsonFile(file, JSON.stringify(jsonData))
        .then(() => {
          resolve("Note removed successfully");
        })
        .catch(err =>
          reject(err)  // error writing to json file
        );
      } else {
        reject("Could not find note to delete")
      }
    })
  })
}

module.exports = { readFromJsonFile, appendToJsonFile, removeFromJsonFile };
