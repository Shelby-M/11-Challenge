const router = require("express").Router();
const db = require("../db/db.json");
const fs = require("fs");
const path = require("path");

router.get("/notes", (req, res) => {
  const notes = fs.readFileSync(path.join(__dirname, "../db/db.json"));
  res.json(notes);
});

module.exports = router;
