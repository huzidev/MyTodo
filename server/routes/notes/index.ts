import cors from "cors";
import express from "express";
const Verification = require("@app/Middleware/Verification");
const NotesController = require("@app/Controllers/NotesController");

const router = express.Router();

router.use(
  cors({
    origin: "*",
  })
);

router.get("/all_notes", Verification, NotesController.GetNotes);
router.get("/completed_notes", Verification, NotesController.GetCompletedNotes);
router.post("/add_note", Verification, NotesController.AddNote);
router.put("/updatenote/:id", Verification, NotesController.UpdateNote);
router.delete("/deletenote/:id", Verification, NotesController.DeleteNote);

module.exports = router;
