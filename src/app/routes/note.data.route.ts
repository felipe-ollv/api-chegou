import { Router } from "express";
import { NoteDataResource } from "../resource/note.data.resource";

const router = Router();

router.get('/find-notification/:value', NoteDataResource.findNoteData);

export default router;