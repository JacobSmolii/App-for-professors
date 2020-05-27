exports.seed = function (knex) {
  return knex("messages").insert([
    {
      id: 1,
      title: "A month left",
      body: "Get stuff done",
      professor_id: 2,
      student_id: null,
      time_to_send: "2020-04-29",
      sent: false,
    },
    {
      id: 2,
      title: "Ingredients",
      body: "Gather ingredients for Defense Against the Dark Arts lesson",
      professor_id: 2,
      student_id: null,
      time_to_send: "2020-04-29",
      sent: false,
    },
    {
      id: 3,
      title: "Deja'vu",
      body: "Have I taught this student before?",
      professor_id: 3,
      student_id: null,
      time_to_send: "2020-03-12",
      sent: true,
    },
    {
      id: 4,
      title: "Mental Shield Test",
      body: "Prepare for a real test",
      professor_id: 3,
      student_id: 7,
      time_to_send: "2020-05-01",
      sent: false,
    },
  ]);
};
