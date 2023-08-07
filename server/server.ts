import cookieParser from 'cookie-parser';
import express, { ErrorRequestHandler } from 'express';

import { mongoConnection } from './configs';
import { router as campgroundsRoutes } from './routes/campgrounds-routes';
import { router as usersRoutes } from './routes/users-routes';
import { ExpressError } from './utils';

const port = process.env.VITE_PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api', usersRoutes);
app.use('/api/campgrounds', campgroundsRoutes);

app.use(((err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const error = err as { code: number; message: string };
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
}) as ErrorRequestHandler);

app.all('*', (_req, _res, next) => {
  next(new ExpressError('Page Not Found!!', 404));
});

mongoConnection()
  .then(() => {
    app.listen(port, () => console.log(`Server started at port: ${port}`));
  })
  .catch(err => console.log(err));
