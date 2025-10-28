import multer from "multer";
import path from "path";

const storagePdf = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "pdfs/");
  },
  filename: function (req, file, cb) {
    cb(null, `document-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Apenas arquivos PDF são permitidos!"), false);
  }
};

export const uploadPdf = multer({ storage: storagePdf, fileFilter });
