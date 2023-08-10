import { Router } from 'express';
import multer from 'multer';

import campgrounds from './../controllers/campgrounds-controllers';
import { isLoggedIn } from './../middleware/isLoggedIn';
import { storage } from './../configs/cloudinary';

export const router = Router();

router.use(isLoggedIn);
const uploadFile = multer({ storage, limits: { fileSize: 6000000, files: 3 } });

router
  .route('/')
  .get(campgrounds.readAll)
  .post(uploadFile.array('images'), campgrounds.create);

router
  .route('/:campgroundId')
  .get(campgrounds.readOne)
  .patch(campgrounds.update)
  .delete(campgrounds.delete);
