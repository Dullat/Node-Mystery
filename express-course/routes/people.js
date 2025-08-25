const express = require("express");
const router = express.Router();
const { getPeople } = require("../controllers/people");

const app = express();
let { people } = require("../data");

router.get("/", getPeople);

router.post("/", (req, res) => {
  const { name } = req.body;
  console.log("name", name);
  if (!name) {
    return res.status(400).json({ sucess: false, msg: "bad request" });
  }
  res.status(201).json({ success: true, person: name });
});

router.post("/postman", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ sucess: false, msg: "bad request" });
  }
  res.status(201).json({ success: true, data: [...people, name] });
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const person = people.find((p) => p.id === Number(id));

  if (!person) {
    res.status(404).json({ sucess: false, msg: "no user with this id" });
  }

  const newPeople = people.filter((p) => p.id !== Number(id));

  res.status(200).json({ message: "User updated", data: newPeople });
});

module.exports = router;
