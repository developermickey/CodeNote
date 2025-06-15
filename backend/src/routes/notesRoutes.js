import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote, getNoteById } from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes)
router.get("/:id", getNoteById)
router.post("/", createNote)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

// app.get("/api/notes", (req, res) => {
//     res.status(200).send("You got 5 Notes");
// })


// app.post("/api/notes", (req, res) => {
//     res.status(201).json({
//         message: "Post created successfully"
//     });
// })


// app.put("/api/notes/:id", (req, res) => {
//     res.status(200).json({
//         message: "Post updated successfully"
//     });
// })


// app.delete("/api/notes/:id", (req, res) => {
//     res.status(200).json({
//         message: "Post deleted successfully"
//     });
// })



export default router;