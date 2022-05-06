const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromJsonFile = util.promisify(fs.readFile);

//
const writeToJsonFile =  util.promisify(fs.writeFile)

// 
const appendToJsonFile = (toAppend, file) => {
  return new Promise((resolve, reject) => {
    if (typeof toAppend !== 'object') reject(`Parsed content is an incorrect type. Received '${typeof toAppend}' expected 'Object'`)
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        let jsonData = JSON.parse(data);
        jsonData.push(toAppend);
        writeToJsonFile(file, JSON.stringify(jsonData))
        .then(() => 
          resolve("Note added successfully")
        )
        .catch(err =>
          reject(err)  
        );
      }
    });
  })
};

// remove object from list of objects
const removeFromJsonFile = (file, toRemove) => {
  return new Promise((resolve, reject) => {
    if (typeof toRemove !== 'object') reject(`Parsed content is an incorrect type. Received '${typeof toRemove}' expected 'Object'`)
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
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
            reject(err)  
          );
        } else {
          reject("Could not find note to delete")
        }
      }
    });
  })
}

module.exports = { readFromJsonFile, appendToJsonFile, removeFromJsonFile };
