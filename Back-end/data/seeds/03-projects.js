exports.seed = function (knex) {
  return knex("projects").insert([
    {
      id: 1,
      student_id: 1,
      name: "robotics",
      description: "make a robot",
      due_date: "2020-04-10",
      completed: true,
    },
    {
      id: 2,
      student_id: 2,
      name: "eye study",
      description: "study the biology of the eye",
      due_date: "2021-01-23",
      completed: false,
    },
    {
      id: 3,
      student_id: 3,
      name: "????",
      description: "execute the plan",
      due_date: "2020-08-23",
      completed: false,
    },
    {
      id: 4,
      student_id: 4,
      name: "Levitation",
      description: "Levio'sa",
      due_date: "2020-02-03",
      completed: true,
    },
    {
      id: 5,
      student_id: 5,
      name: "Politicking",
      description: "Mentor draco in advanced Politicking",
      due_date: "2020-02-03",
      completed: true,
    },
    {
      id: 6,
      student_id: 6,
      name: "Marbles",
      description:
        "Have Zorian practice shaping until marbles will not disrupt his concentration",
      due_date: "2020-03-13",
      completed: false,
    },
    {
      id: 7,
      student_id: 7,
      name: "Mental Defense",
      description:
        "Teach Zach how to quickly build and maintain a mental shield",
      due_date: "2020-07-31",
      completed: false,
    },
  ]);
};
