import { Response } from "express";
const Contact = require("@app/Models/User");
const Notes = require("@app/Models/Notes");
const User = require("@app/Models/User");

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
}
};

module.exports = NotesController;
 