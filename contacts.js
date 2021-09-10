const path = require('path')
const fs = require('fs')

const contactsDBHeandler = require('./utils/contactsDBHeandler')

const DATABASE = "contacts.json"
const contactsPath = path.resolve(__dirname, "db", DATABASE)

function listContacts() {
    fs.readFile(contactsPath, "utf-8", async (err, data) => {
        if (err) {
            console.log("ERROR: ", err);
        } else {
            const recvData = JSON.parse(data)
            console.table(recvData);
        };
    });
}

function getContactById(contactId) {
    fs.readFile(contactsPath, "utf-8", async (err, data) => {
        if (err) {
            console.log("ERROR: ", err)
        } else {
            const recvData = JSON.parse(data)
            const filteredData = recvData.filter(elem => elem.id === parseInt(contactId))
            if (filteredData.length) {
                console.table(filteredData)
            } else {
                console.log("\nno contacts found...\n")
            }
        }
    })
}

function removeContact(contactId) {
    fs.readFile(contactsPath, "utf-8", async (err, data) => {
        if (err) {
            console.log("ERROR: ", err)
        } else {
            const recvData = JSON.parse(data)
            const filteredData = recvData.filter(elem => elem.id !== parseInt(contactId))
            if (filteredData.length) {
                contactsDBHeandler(contactsPath, filteredData)
            } else {
                console.log("\nno contacts found...\n")
            }
        }
    })
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath, "utf-8", async (err, data) => {
        if (err) {
            console.log("ERROR: ", err)
        } else {
            const recvData = JSON.parse(data)
            const newContactId = recvData[recvData.length - 1].id + 1
            const newContact = {
                "id": newContactId,
                "name": name,
                "email": email,
                "phone": phone
            }
            const newData = [...recvData, newContact]
            contactsDBHeandler(contactsPath, newData)
        }
    })
}

module.exports = { listContacts, getContactById, removeContact, addContact }