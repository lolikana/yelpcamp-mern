import { Response } from 'express';
import jwt from 'jsonwebtoken';

import { isProduction } from './../configs/mongodb';

const generateToken = (_res: Response, uid: string, email?: string) => {
  const token = jwt.sign(
    { userId: uid, email: email },
    isProduction ? (process.env.JWT_SECRET as string) : 'supersecret_dont_share',
    { expiresIn: '30d' }
  );

  // res.cookie('access_token', token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
  //   sameSite: 'strict', // Prevent CSRF attacks
  //   maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  // });

  return token;
};

export default generateToken;
