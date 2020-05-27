//import express objects
const express = require('express');

//setup Student Object
const Projects = require('./projects-models.js');

//set up router object
const router = express.Router();

/** PROJECT ENDPOINTS */

//READ
//get project by id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    
    Projects.findProject(id)
        .then(project => {
            if (!project){
                res.status(404).json({errorMessage: 'Could not find project with set id.'})
            } else {
                res.status(200).json({message: 'Pulling up project information: ', project})
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: "Server error, could not find project id. Contact backend.", err})
        })
})


//UPDATE
//edit project details
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    const missingFields = [];
    if (changes.name === undefined) missingFields.push("name");
    if (changes.description === undefined) missingFields.push("description");
    if (changes.due_date === undefined) missingFields.push("due_date");
    if (changes.completed === undefined) missingFields.push("completed");

    if (missingFields.length > 0) {
        res.status(400).json({errorMessage: `Missing required fields: ${missingFields}`});
        return;
    }

    Projects.editProject(changes, id)
        .then(project => {
            if(!project) {
                res.status(404).json({errorMessage: 'Could not find project with set id, please try again'})
            } else {
                res.status(200).json({message: 'Project information updated', project})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({errorMessage: 'Server error, unable to edit project', err})
        })
})

//DELETE
//delete project
router.delete('/:id', (req, res) => {
    const {id} = req.params

    Projects.findProject(id).then(project => {
        Projects.deleteProject(id)
            .then(deleted => {
                if(!deleted) {
                    res.status(404).json({errorMessage: 'Could not delete the project with the set id, please try again.'})
                } else {
                    res.status(200).json({message: "Project deleted", project})
                }
            })
            .catch(err => {
                res.status(500).json({errorMessage: 'Server error, could not delete project.'})
            })
    })
    .catch(err => {
        res.status(500).json({errorMessage: 'Server error, could not get projects.'})
    });
})


module.exports = router;
