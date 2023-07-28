import { Router } from 'express';

import campgrounds from './../controllers/campgrounds-controllers';
import { isLoggedIn } from './../middleware/isLoggedIn';

export const router = Router();

router.use(isLoggedIn);

router.route('/').get(campgrounds.readAll).post(campgrounds.create);
