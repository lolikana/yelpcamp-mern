import { RequestHandler } from 'express';

import { User } from './../models';
import { ExpressError } from './../utils';

export default {
  getAll: (async (_req, res, next): Promise<void> => {
    try {
      const users = await User.find({});
      res.json({ users: users.map(user => user.toObject({ getters: true })) });
    } catch (err) {
      const error = new ExpressError(
        'Fetching users failed, please try again later.' || err,
        500
      );
      next(error);
    }
  }) as RequestHandler
};
