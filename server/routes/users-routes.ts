import { Router } from 'express';

import users from './../controllers/users-controllers';

export const router = Router();

router.route('/').get(users.getAll);
