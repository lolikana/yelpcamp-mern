import { Router } from 'express';

import campgrounds from './../controllers/campgrounds-controllers';

export const router = Router();

router.route('/').post(campgrounds.create);
