const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const contactsList = JSON.parse(data);
        // console.table(contactsList);
        return contactsList;
    } catch (err) {
        console.log(err);
    }
}
  
async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const contact = contacts.find(item => item.id === contactId);
        console.log(contact);
        return contact;   
    } catch(err) {
        console.log(err);
    }
    
}
  
async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const removedContactIndex = contacts.findIndex(contact => contact.id === contactId);
        if (deletedContactIndex === -1) {
            return null;
        }
          
        const removedContact = contacts.splice(removedContactIndex, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        console.log(removedContact);
        return removedContact;
        
    } catch (error) {
        console.log(error);
    }
    
}
  
async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const id = createId(contacts);
        const newContact = {id, name, email, phone};
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        console.log(newContact);
        return newContact;
    } catch(err) {
        console.log(err);
    }   
};

function createId (list) {
    return list.length + 1;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}