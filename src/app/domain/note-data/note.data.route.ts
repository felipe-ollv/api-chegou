import { Router } from "express";
import { NoteDataResource } from "./note.data.resource";

const router = Router();

router.get('/find-note-data/:value', NoteDataResource.findNoteData);

export default router;