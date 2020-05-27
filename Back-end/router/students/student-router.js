//import express objects
const express = require("express");

//setup Student Object
const Students = require("./student-models");

//set up router object
const router = express.Router();

/** STUDENT ENDPOINTS */

//READ
//get all students
router.get("/", (req, res) => {
  Students.getStudents(req.token.id)
    .then((students) => {
      res.status(200).json({
        message: "Rendering student list: ",
        students: students.map((s) => ({
          id: s.id,
          name: s.name,
          email: s.email,
        })),
      });
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage:
          "Server error, could not render student list. Contact backend.",
        err,
      });
    });
});

//get student by id
router.get("/:id", validateStudentId, (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    message: "Pulling up student information: ",
    student: {
      id: req.student.id,
      name: req.student.name,
      email: req.student.email,
    },
  });
});

//get project by student id
router.get("/:id/projects", (req, res) => {
  const { id } = req.params;

  Students.getProjectList(id)
    .then((projects) => {
      res
        .status(200)
        .json({ message: "Rendering Student Project List: ", projects });
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage:
          "Server error, could not render the specific student project list",
        err,
      });
    });
});

router.post("/:id/projects", (req, res) => {
  const { id } = req.params;
  const project = req.body;

  if (project.id !== undefined) {
    res.status(400).json({ errorMessage: "id field must not be defined" });
    return;
  }

  const missingFields = [];
  if (project.name === undefined) missingFields.push("name");
  if (project.description === undefined) missingFields.push("description");
  if (project.due_date === undefined) missingFields.push("due_date");
  if (project.completed === undefined) missingFields.push("completed");

  if (missingFields.length > 0) {
    res
      .status(400)
      .json({ errorMessage: `Missing required fields: ${missingFields}` });
    return;
  }

  Students.addProject(project, id)
    .then((project) => {
      res
        .status(201)
        .json({ message: "Rendering New Student Project: ", project });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage:
          "Server error, could not render the specific student project list",
        err,
      });
    });
});

//CREATE
//add student
router.post("/", validateStudentObj, (req, res) => {
  const studentData = req.body;

  Students.addStudent({ ...studentData, professor_id: req.token.id })
    .then((student) => {
      res.status(201).json({ message: "Student successfully added", student });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Server error, student not added.", err });
    });
});

//add project to student object

//UPDATE
//edit student
router.put("/:id", validateStudentId, validateStudentObj, (req, res) => {
  Students.editStudent(req.body, req.student.id)
    .then((updated) => {
      if (updated) {
        res.status(200).json({
          message: "Student information updated.",
          updated: {
            id: updated.id,
            name: updated.name,
            email: updated.email,
          },
        });
      } else {
        res.status(500).json({ errorMessage: "Student was not updated" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ errorMessage: "Failed to update student", error });
    });
});

//DELETE
//delete student
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Students.findStudent(id)
    .then((student) => {
      Students.deleteStudent(id)
        .then((deleted) => {
          if (!deleted) {
            res.status(404).json({
              errorMessage: "Unable to delete student; set id not found.",
            });
          } else {
            student.professor_id = undefined;
            res
              .status(200)
              .json({ message: "Student successfully deleted.", student });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            errorMessage: "Server errror, unable to delete student",
            err,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Server error, could not look up student", err });
    });
});

function validateStudentId(req, res, next) {
  const student = Students.findStudent(req.params.id)
    .then((student) => {
      if (student) {
        req.student = student;
        next();
      } else {
        res
          .status(404)
          .json({ errorMessage: "No student with the specified id was found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ errorMessage: "Failed to retrieve student data", error });
    });
}

function validateStudentObj(req, res, next) {
  if (req.body == undefined) {
    res.status(400).json({ errorMessage: "Invalid body" });
    return;
  }

  const missingFields = [];
  if (req.body.name === undefined) missingFields.push("name");
  if (req.body.email === undefined) missingFields.push("email");

  if (missingFields.length > 0) {
    res.status(400).json({
      errorMessage: `The following required fields are missing: ${missingFields}`,
    });
    return;
  }

  if (req.body.professor_id) {
    res.status(400).json({
      errorMessage: `professor_id must not be defined`,
    });
    return;
  }

  next();
}

module.exports = router;
