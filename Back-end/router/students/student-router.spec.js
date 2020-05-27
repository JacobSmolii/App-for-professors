const request = require("supertest");
const auth = require("../../api/auth.js");
const db = require("../../data/config.js");
const server = require("../../api/server.js");

describe("students router", () => {
  const example_professor = {
    id: 1,
    name: "Schroeder",
    email: "Schroeder@gmail.com",
    password: "superposition",
  };

  const example_student = {
    id: 1,
    name: "Bob",
    email: "bob@gmail.com",
  };

  const example_project = {
    id: 1,
    student_id: 1,
    name: "example project",
    description: "example project description",
    due_date: "2020-04-28",
    completed: 0,
  };

  let token;

  beforeEach(async () => {
    token = auth.generateToken(example_professor);
    await db("projects")
      .truncate()
      .then(() => db("students").truncate())
      .then(() => db("users").truncate());
    return db("users")
      .insert(example_professor)
      .then(() =>
        db("students").insert({
          ...example_student,
          professor_id: example_professor.id,
        })
      )
      .then(() => db("projects").insert(example_project));
  });

  describe("GET /api/students", () => {
    it("should return 200", async () => {
      const res = await request(server)
        .get(`/api/students`)
        .set("Authorization", token);
      expect(res.status).toBe(200);
    });

    it("should return list with example student", async () => {
      const res = await request(server)
        .get(`/api/students`)
        .set("Authorization", token);
      expect(res.body.students).toEqual([example_student]);
    });
  });

  describe("GET /api/students/:id", () => {
    it("should return 200", async () => {
      const res = await request(server)
        .get(`/api/students/${example_student.id}`)
        .set("Authorization", token);
      expect(res.status).toBe(200);
    });

    it("should return example student", async () => {
      const res = await request(server)
        .get(`/api/students/${example_student.id}`)
        .set("Authorization", token);
      expect(res.body.student).toEqual(example_student);
    });

    it("should return 404 on unknown students", async () => {
      const res = await request(server)
        .get(`/api/students/1337`)
        .set("Authorization", token);
      expect(res.status).toBe(404);
    });
  });

  describe("GET /api/students/:id/projects", () => {
    it("should return 200", async () => {
      const res = await request(server)
        .get(`/api/students/${example_student.id}/projects`)
        .set("Authorization", token);
      expect(res.status).toBe(200);
    });

    it("should return list with example project", async () => {
      const res = await request(server)
        .get(`/api/students/${example_student.id}/projects`)
        .set("Authorization", token);
      expect(res.body.projects).toEqual([example_project]);
    });
  });

  describe("POST /api/students/:id/projects", () => {
    const new_project = {
      student_id: 1,
      name: "new project",
      description: "new project description",
      due_date: "2020-04-20",
      completed: 1,
    };

    it("should return new project", async () => {
      const res = await request(server)
        .post(`/api/students/${example_student.id}/projects`)
        .send(new_project)
        .set("Authorization", token);
      expect(res.status).toBe(201);
      expect(res.body.project.student_id).toBe(new_project.student_id);
      expect(res.body.project.name).toBe(new_project.name);
      expect(res.body.project.description).toBe(new_project.description);
      expect(res.body.project.due_date).toBe(new_project.due_date);
      expect(res.body.project.completed).toBe(new_project.completed);
    });

    it("should add the project to the database", async () => {
      const pre_existing = await db("projects")
        .select()
        .where({ name: new_project.name });
      expect(pre_existing).toHaveLength(0);

      const res = await request(server)
        .post(`/api/students/${example_student.id}/projects`)
        .send(new_project)
        .set("Authorization", token);

      const row = await db("projects")
        .select()
        .where({ name: new_project.name })
        .first();
      expect(row.student_id).toBe(new_project.student_id);
      expect(row.name).toBe(new_project.name);
      expect(row.description).toBe(new_project.description);
      expect(row.due_date).toBe(new_project.due_date);
      expect(row.completed).toBe(new_project.completed);
    });
  });

  describe("POST /api/students", () => {
    const new_student = {
      name: "Evan",
      email: "evan@gmail.com",
    };

    it("should return 201", async () => {
      const res = await request(server)
        .post(`/api/students`)
        .send(new_student)
        .set("Authorization", token);
      expect(res.status).toBe(201);
    });

    it("should return new student", async () => {
      const res = await request(server)
        .post(`/api/students`)
        .send(new_student)
        .set("Authorization", token);
      expect(res.body.student.professor_id).toBe(example_professor.id);
      expect(res.body.student.name).toBe(new_student.name);
      expect(res.body.student.email).toBe(new_student.email);
    });

    it("should return 400 on invalid student objects", async () => {
      const res = await request(server)
        .post(`/api/students`)
        .send({ random_key: "hey-o" })
        .set("Authorization", token);
      expect(res.status).toBe(400);
    });

    it("should return 404 on unknown students", async () => {
      const res = await request(server)
        .get(`/api/students/1337`)
        .set("Authorization", token);
      expect(res.status).toBe(404);
    });

    it("should add the student to the database", async () => {
      const pre_existing = await db("projects")
        .select()
        .where({ name: new_student.name });
      expect(pre_existing).toHaveLength(0);

      const res = await request(server)
        .post(`/api/students`)
        .send(new_student)
        .set("Authorization", token);

      const row = await db("students")
        .select()
        .where({ name: new_student.name })
        .first();
      expect(row.name).toBe(new_student.name);
      expect(row.email).toBe(new_student.email);
    });
  });

  describe("PUT /api/students/:id", () => {
    const updated_student = {
      name: "mario",
      email: "mario@gmail.com",
    };

    it("should return 200", async () => {
      const res = await request(server)
        .put(`/api/students/1`)
        .send(updated_student)
        .set("Authorization", token);
      expect(res.status).toBe(200);
    });

    it("should return updated student", async () => {
      const res = await request(server)
        .put(`/api/students/1`)
        .send(updated_student)
        .set("Authorization", token);
      expect(res.body.updated).toEqual({
        ...updated_student,
        id: 1,
      });
    });

    it("should reject changes to professor_id", async () => {
      const res = await request(server)
        .put(`/api/students/1`)
        .send({ ...updated_student, professor_id: 1 })
        .set("Authorization", token);
      expect(res.status).toBe(400);
    });

    it("should reject invalid student objects", async () => {
      const res = await request(server)
        .put(`/api/students/1`)
        .send({ random_key: "hey-o" })
        .set("Authorization", token);
      expect(res.status).toBe(400);
    });

    it("should return 404 on unknown students", async () => {
      const res = await request(server)
        .put(`/api/students/1337`)
        .send(updated_student)
        .set("Authorization", token);
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/students", () => {
    it("should return deleted student", async () => {
      const res = await request(server)
        .delete(`/api/students/${example_student.id}`)
        .set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body.student).toEqual(example_student);
    });

    it("should return 404 on unknown students", async () => {
      const res = await request(server)
        .delete(`/api/students/1337`)
        .set("Authorization", token);
      expect(res.status).toBe(404);
    });
  });
});
