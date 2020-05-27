//import the database
const db = require('../../data/config');

//helper functions

/** PROJECT HELPER FUNCTIONS */

//get list of projects
function getProjects(student_id) {
    return db('projects').select().where({student_id});
}

//get project by id
function findProject(id) {
    return db('projects').where({id}).first();
}

//add project
function addNewProject(newProject){
    return db('projects')
        .insert(newProject, 'id')
        .then(([id]) => {
            return findProject(id)
        })
}

//update project
function editProject(changes, id) {
    return db('projects')
        .where('id', id)
        .update(changes, "id")
        .then(updated => findProject(id))
}

//delete function
function deleteProject(id){
    return db('projects')
        .where('id', id)
        .del()
}

module.exports = {
    getProjects,
    findProject,
    addNewProject,
    editProject,
    deleteProject
}
