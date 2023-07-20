import { RequestHandler } from 'express';

import { ISignup } from './../libs/types';
import { User } from './../models';
import { ExpressError } from './../utils';
import { signupSchema } from './../utils/validations';

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
  }) as RequestHandler,

  singup: (async (req, res, next) => {
    try {
      const { username, email } = req.body as ISignup;
      const isUsernameExist = await User.findOne({ username });
      if (isUsernameExist) {
        const error = new ExpressError('This username is already taken.', 409);
        return next(error);
      }
      const isEmailExist = await User.findOne({ email });
      if (isEmailExist) {
        const error = new ExpressError('This email is already used.', 409);
        return next(error);
      }

      const result = signupSchema.safeParse(req.body);
      if (!result.success) {
        const error = new ExpressError(result.error.issues[0].message, 422);
        return next(error);
      }
      const newUser = new User({
        username: result.data.username,
        email: result.data.email,
        password: result.data.password
      });
      await newUser.save();
      return res.redirect('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        const error = new ExpressError(
          `Something went wrong when trying to sign up: ${err.message}`,
          500
        );
        return next(error);
      }
      return next(err);
    }
  }) as RequestHandler
};
