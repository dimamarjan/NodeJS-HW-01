const fs = require('fs')

function contactsDBHeandler(path, recivedData) {
    const parsedData = JSON.stringify(recivedData)
    fs.writeFile(path, parsedData, "utf8", (err) => {
        if (err) {
            console.log("ERROR: ", err)
        }
    })
}

module.exports = contactsDBHeandler