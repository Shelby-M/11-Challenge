const express = require("express");
const app = express();
const PORT = process.env.port || 3001;
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");
const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get("/notes/:id", (req, res) => {
  res.json(notes(req.params.id));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", function (err, text) {
    const noteData = JSON.parse(text);
    console.log(noteData);
    res.json(noteData);
  });
});

app.post("/api/notes/", (req, res) => {
  fs.readFile("./db/db.json", function (err, text) {
    const noteData = JSON.parse(text);
    console.log(noteData);
    const noteId = req.body;
    noteId.id = uniqid();
    noteData.push(noteId);

    fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
      if (err) console.log(err);
      res.json(noteData);
    });
  });
});
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", function (err, text) {
    const noteData = JSON.parse(text);
    console.log(noteData);
    const sortData = noteData.filter((note) => note.id !== req.params.id);
    fs.writeFile("./db/db.json", JSON.stringify(sortData), (err) => {
      if (err) console.log(err);
      res.json(sortData);
    });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});
