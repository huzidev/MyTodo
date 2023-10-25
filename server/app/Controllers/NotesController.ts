import { Response } from "express";
const Contact = require("@app/Models/User");
const Notes = require("@app/Models/Notes");
const User = require("@app/Models/User");
const CompletedNotes = require("@app/Models/completedNotes");

const NotesController = {
  // Get All Notes
  GetNotes: async (req: any, res: Response) => {
    try {
      if (req.path.includes("mystring")) {
        res.send('The current pathname includes "mystring"');
      }
      const notes = await Notes.find({ user: req.userID });
      res.json(notes);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(String(err));
      }
      return res.status(500).send("Failed! Internal Server Error");
    }
  },

  // Fetch All Completed Notes
  GetCompletedNotes: async (req: any, res: Response) => {
    try {
      const notes = await CompletedNotes.find({ user: req.userID });
      res.json(notes);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(String(err));
      }
      return res.status(500).send("Failed! Internal Server Error");
    }
  },

  // Add Note Function
  AddNote: async (req: any, res: Response) => {
    try {
      const { title, description, category, isCompleted } = req.body;
      console.log("Title is", title);
      if (!title || !description || !category) {
        return res.status(404).json({ message: "You've left an tag empty" });
      } else {
        const note = new Notes({
          title,
          description,
          category,
          isCompleted,
          user: req.userID,
        });
        const savedNote = await note.save();
        res.json(savedNote);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(String(err));
      }
      return res.status(500).send("Failed! Internal Server Error");
    }
  },

  // Update Note Function
  UpdateNote: async (req: any, res: Response) => {
    const { title, description, category, isCompleted } = req.body;
    console.log("req", req.body);
    try {
      const newNote = <TypesNote>{};
      if (title || description || category || isCompleted) {
        newNote.title = title;
        newNote.description = description;
        newNote.category = category;
        newNote.isCompleted = isCompleted;
      }
      let note: any, savedNote: any, state: any, hold: any, main: any;
      if (await Notes.findById(req.params.id)) {
        main = Notes;
        state = true;
        hold = CompletedNotes;
      } else if (await CompletedNotes.findById(req.params.id)) {
        main = CompletedNotes;
        state = false;
        hold = Notes;
      }
      note = await main.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ error: "Not Found" });
      }
      if (note.user.toString() !== req.userID.toString()) {
        return res.status(401).send("Not Allowed");
      }
      if (isCompleted === state) {
        note = new hold({
          title,
          description,
          category,
          isCompleted,
          user: req.userID,
        });
        savedNote = await note.save();
        if (note.user.toString() !== req.userID.toString()) {
          return res.status(401).send("Un-Authorized Access, Not Allowed");
        }
        // ex: if note is changed to completed from inCompleted then delete that note from allnotes table and add it to completedNotes table
        note = await main.findByIdAndDelete(req.params.id);
      }
      note = await main.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note, savedNote });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(String(err));
      }
      return res.status(500).send("Failed! Internal Server Error");
    }
  },
};

module.exports = NotesController;
