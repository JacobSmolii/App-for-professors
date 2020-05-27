//import the database
const db = require('../../data/config');

//helper functions

/** USER HELPER FUNCTIONS */

//get list of users
function getUsers() {
    return db('users');
}

//get user by id
function findUser(id){
    return db('users').where({id}).first();
}

//add user
function addUser(user){
    return db('users')
        .insert(user, 'id')
        .then(([id]) => {
            return findUser(id)
        })
}

//update user information
function editUser(changes, id) {
    return db('users')
        .where({id})
        .update(changes)
        .then(count => {
            if (count > 0){
                return findUser(id)
            } else {
                return null;
            }
        })
}

//delete user
function deleteUser(id) {
    return db('users')
        .where('id', id)
        .del();
}

function findUserByEmail(email) {
    return db('users').select().where({email}).first();
}


module.exports = {
    getUsers,
    findUser,
    addUser,
    findUser,
    editUser,
    deleteUser,
    findUserByEmail
}
