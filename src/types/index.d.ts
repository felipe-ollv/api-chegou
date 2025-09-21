import type { Multer } from "multer";

declare global {
  namespace Multer {
    export interface Request {
      file?: Multer.File;
      files?: Multer.File[];
    }
  }
}