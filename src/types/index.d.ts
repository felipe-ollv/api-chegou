declare namespace Express {
  namespace Multer {
    interface File {
      key: string;
      location: string;
    }
  }

  export interface Request {
    file?: Multer.File;
    files?: Multer.File[];
  }
}
