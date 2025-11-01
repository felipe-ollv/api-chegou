import { Router } from "express";
import { NoteDataResource } from "./note.data.resource";
import { uploadPdf } from "../../config/multer-pdf-storage";

const router = Router();

router.get('/find-note-data/:value', NoteDataResource.findNoteData);
router.post(
  '/document',
  uploadPdf.single('file'),
  NoteDataResource.uploadPdf
);
router.get('/pdf/:fileName', NoteDataResource.fetchNotePdf);

export default router;