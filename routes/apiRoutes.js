const router = require("express").Router();
const db = require("../db/db.json");
const fs = require("fs");

router.get("/notes", (req, res) => {
  const notes = fs.readFileSync("../db/db.json", "utf-8");
  res.json(notes);
});

module.exports = router;
