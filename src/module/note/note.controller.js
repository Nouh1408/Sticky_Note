import { Router } from "express";
import { addNote, replacenote, updateNote } from "./services/note.srvice.js";
const router = Router()
router.post('/addnote', addNote)
router.patch('/updateNote/:noteId', updateNote)
router.put('/replace/:noteId', replacenote)
export default router