//import the database
const db = require('../../data/config');

const findProject = require("../projects/projects-models.js").findProject;

/** STUDENT HELPER FUNCTIONS */

//get a list of all the students under the user
function getStudents(professor_id){
    return db('students').select().where({professor_id});
}

//get student by their id
function findStudent(id) {
    return db('students').where({id}).first()
}

//add new student
function addStudent(student){
    return db('students')
        .insert(student, 'id')
        .then(([id]) => {
            return findStudent(id)
        });
}

//add new project to student object
function addProject(project, student_id){
    return db('projects')
        .insert({...project, student_id}, "id")
        .then(([id]) => {
            return findProject(id);
        })
}

//add new message to student object
function addMessage(message, student_id) {
    return db('messages')
        .insert({...message, student_id}, "id")
        .then(([id]) => {
            return findMessages(id);
        })
}

//edit Student information
function editStudent(changes, id) {
    return db('students')
        .where('id', id)
        .update(changes)
        .then(updated => {
            return updated > 0 ? findStudent(id) : null
        })
}

//delete student
function deleteStudent(id) {
    return db('students')
        .where('id', id)
        .del()
}

//get list of projects related to specific student
function getProjectList(student_id){
    return db('projects').select().where({student_id})
}

module.exports = {
    findStudent,
    addStudent,
    addProject,
    getStudents,
    editStudent,
    deleteStudent,
    addMessage,
    getProjectList
}
