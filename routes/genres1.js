const Joi = require('joi');
const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Romantic" },
  { id: 3, name: "Horror" },
  { id: 4, name: "Thriller" },
  { id: 5, name: "Fiction" },
  { id: 6, name: "Mystory" },
  { id: 7, name: "Documentry" },
  { id: 8, name: "Node Course" },
  { id: 9, name: "SciFi" },
  { id: 10, name: "Anime" },
];

router.get("/", (req, res) => {
  res.send(genres);
});

// Get Genre
router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send("Opps! Genre not found");
  res.send(genre);
});

// Post Genre
router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

// Update Genre
router.put("/:id", (req, res) => {
  // Look up the genre
  // If not existing, return 404
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre not found!");

  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update genre
  // Return the updated genre
  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  // Look up the course
  // If not existing, return 404
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre not found!");

  // Delete
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  // Return the same course
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

module.exports = router;
