import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';

import { loginSchema, signupSchema } from '../libs/validations';
import { ISignup } from './../libs/types';
import { User } from './../models';
import { ExpressError } from './../utils';
import generateToken from './../utils/generateToken';

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

      const uid = newUser.id as string;
      const userEmail = newUser.email as string;

      const token = generateToken(res, uid, userEmail);

      return res.status(201).send({ userId: uid, email: userEmail, token });
    } catch (err) {
      return next(err);
    }
  }) as RequestHandler,

  login: (async (req, res, next) => {
    try {
      const result = await loginSchema.safeParseAsync(req.body);
      if (!result.success) {
        const error = new ExpressError(
          `Error when tried to login: ${result.error.issues[0].message}`,
          500
        );
        return next(error);
      }
      const user = await User.findOne({ email: result.data.email });
      if (!user) {
        const error = new ExpressError('No user with this email was found.', 500);
        return next(error);
      }
      const uid = user.id as string;
      const userEmail = user.email as string;

      const token = generateToken(res, uid, userEmail);

      return res.json({
        userId: uid,
        email: userEmail,
        token
      });
    } catch (err) {
      if (err instanceof Error) {
        const error = new ExpressError(err.message, 500);
        return next(error);
      }
      const error = new ExpressError(err as string, 500);
      return next(error);
    }
  }) as RequestHandler,

  logout: ((_req, res) => {
    // res.cookie('access_token', '', {
    //   httpOnly: true,
    //   expires: new Date(0)
    // });
    res.status(200).json({ message: 'Logged out successfully' });
  }) as RequestHandler
};
