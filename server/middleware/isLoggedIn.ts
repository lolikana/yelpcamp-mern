import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { isProduction } from './../configs/mongodb';
import { ExpressError } from './../utils';

export const isLoggedIn = ((req, _res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodeToken = jwt.verify(
      token,
      isProduction ? (process.env.JWT_SECRET as string) : 'supersecret_dont_share'
    ) as { userId: string };
    req.userData = { userId: decodeToken.userId };
    next();
  } catch (err) {
    const error = new ExpressError('Authentication failed!', 401);
    return next(error);
  }
}) as RequestHandler;
