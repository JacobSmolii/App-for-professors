//import express objects
const express = require('express');

//setup Student Object
const Users = require('./users-models.js');

//set up router object
const router = express.Router();

/** USERS ENDPOINTS */

//READ
//pull up list of all registered users
router.get('/', (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(201).json({message: 'Rendering user list: ', users});
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'Server error, could not render list of users', err});
        })
})

//get user information by id
router.get('/:id', (req, res) => {
    const {id} = req.params;

    Users.findUser(id)
        .then(user => {
            if(!user){
                res.status(404).json({errorMessage: "Could not find user by id, try again."})
            } else {
                res.status(201).json({message: 'Rendering user information', user})
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'Server error, could not find user by id.', err})
        })
})


//UPDATE
//update user information
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Users.findUser(id)
        .then(user => {
            if(!user) {
                res.status(404).json({errorMessage: 'Could not update user, user id not found.'})
            } else {
               Users.editUser(changes, id)
                .then(update => {
                    res.status(201).json({message: 'User successfully updated', update})
                })
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'Server error, could not update user.', err})
        })
}) 


//DELETE
//delete user
router.delete('/:id', (req, res) => {
    const {id} = req. params;

    Users.deleteUser(id)
        .then(deleted => {
            if (!deleted){
                res.status(404).json({errorMessage: 'Could not delete user, user id not found.'})
            } else {
                res.status(201).json({message: 'User deleted.', deleted})
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'Server error, could not delete user.', err})
        })
})

module.exports = router;
