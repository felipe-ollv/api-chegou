import * as multer from "multer";

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File; // para 1 arquivo
      files?: Express.Multer.File[]; // para vários arquivos
    }
  }
}

export { };