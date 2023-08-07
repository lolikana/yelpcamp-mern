import { Router } from 'express';

import users from './../controllers/users-controllers';

export const router = Router();

router.route('/signup').post(users.singup);

router.route('/login').post(users.login);

router.route('/logout').post(users.logout);
