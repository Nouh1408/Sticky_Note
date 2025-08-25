import { Router } from "express";
import { addNote, deletednote, replacenote, updateAllNote, updateNote } from "./services/note.srvice.js";
const router = Router()
router.post('/addnote', addNote)
router.patch('/updateNote/:noteId', updateNote)
router.put('/replace/:noteId', replacenote)
router.patch('/updateAll', updateAllNote)
router.delete('/deletednote/:noteId', deletednote)
export default router