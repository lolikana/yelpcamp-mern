import { Router } from 'express';

import campgrounds from './../controllers/campgrounds-controllers';
import { isLoggedIn } from './../middleware/isLoggedIn';

export const router = Router();

router.use(isLoggedIn);

router.route('/').post(campgrounds.create);
