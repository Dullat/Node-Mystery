const express = require("express");
const app = express();
let { people } = require("./data.js");

app.use(express.static("./methods-public"));

// parse from data
app.use(express.urlencoded({ extended: false }));

app.get("/api/people", (req, res) => {
  res.status(200).json({ sucess: true, data: people });
});

//parse json
app.use(express.json());
app.post("/api/people", (req, res) => {
  const { name } = req.body;
  console.log("name", name);
  if (!name) {
    return res.status(400).json({ sucess: false, msg: "bad request" });
  }
  res.status(201).json({ success: true, person: name });
});

app.post("/api/postman/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ sucess: false, msg: "bad request" });
  }
  res.status(201).json({ success: true, data: [...people, name] });
});

app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((p) => p.id === Number(id));

  if (!person) {
    res.status(404).json({ sucess: false, msg: "no user with this id" });
  }

  const newPeople = people.map((p) => {
    if (p.id === Number(id)) {
      p.name = name;
    }

    return p;
  });

  res.status(200).json({ message: "User updated", data: newPeople });
});

app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params;

  const person = people.find((p) => p.id === Number(id));

  if (!person) {
    res.status(404).json({ sucess: false, msg: "no user with this id" });
  }

  const newPeople = people.filter((p) => p.id !== Number(id));

  res.status(200).json({ message: "User updated", data: newPeople });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`welcome ${name}`);
  }

  return res.status(400).send("No data");
});

app.listen(5000, () => {
  console.log("server is listening on 5000");
});
