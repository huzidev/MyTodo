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
};

module.exports = NotesController;
