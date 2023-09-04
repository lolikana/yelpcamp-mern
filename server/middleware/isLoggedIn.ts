import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { isProduction } from './../configs/mongodb';
import { ExpressError } from './../utils';

export const isLoggedIn = ((req, _res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  // const token = (req.cookies as { access_token: string }).access_token;
  const tokenHeaders = req.headers.authorization?.split(' ')[1]; // Authorization: 'Bearer TOKEN'
  if (tokenHeaders) {
    try {
      const decoded = jwt.verify(
        tokenHeaders,
        isProduction ? (process.env.JWT_SECRET as string) : 'supersecret_dont_share'
      ) as {
        userId: string;
      };
      req.userData = { userId: decoded.userId };
      next();
    } catch (err) {
      const error = new ExpressError(
        `Authentication failed! ${(err as Error).message}`,
        401
      );
      return next(error);
    }
  } else {
    const error = new ExpressError(`Not authorized, token not valid`, 401);
    return next(error);
  }
}) as RequestHandler;
