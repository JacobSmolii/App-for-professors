//import the database
const db = require('../../data/config');

//helper functions

/** MESSAGES HELPER FUNCTIONS */

//get list of messages
function getMessages(professor_id) {
    return db('messages').select().where({professor_id});
}

//get message by id
function findMessage(id){
    return db('messages').where({id}).first();
}

//add message
function addMessage(message){
    return db('messages')
        .insert(message, 'id')
        .then(([id]) => {
            return findMessage(id)
        })
}

//update message information
function editMessage(changes, id) {
    return db('messages')
        .where({id})
        .update(changes)
        .then(count => {
            if (count > 0){
                return findMessage(id)
            } else {
                return null;
            }
        })
}

//delete user
function deleteMessage(id) {
    return db('messages')
        .where('id', id)
        .del();
}


module.exports = {
    getMessages,
    findMessage,
    editMessage,
    deleteMessage,
    addMessage
};