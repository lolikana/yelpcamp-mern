import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';

import { ISignup } from './../libs/types';
import { User } from './../models';
import { ExpressError } from './../utils';
import { signupSchema } from './../utils/validations';

export default {
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

      const password = result.data.password;
      const hashedPassword = await bcrypt.hash(password, 12);
      if (!hashedPassword) {
        const error = new ExpressError(
          'Something went wrong when creating password.',
          500
        );
        return next(error);
      }

      const newUser = new User({
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword
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
