import multer from 'multer';

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image') ||
    file.mimetype.startsWith('application/pdf')
  ) {
    cb(null, true);
  } else {
    cb('Invalid Image File!', false);
  }
};

export const multerMiddleware = multer({ storage, fileFilter });
