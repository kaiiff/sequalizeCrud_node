const express = require("express");
const {
  postNote,
  getNotes,
  updateNotes,
  deletNotes,
} = require("../controller/notes");
const routes = express.Router();

routes.post("/add-notes", postNote);
routes.get("/get-data", getNotes);
routes.put("/update-notes/:noteId", updateNotes);
routes.delete("/delete-notes/:noteId", deletNotes);

module.exports = routes;
