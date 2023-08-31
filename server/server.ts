import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { ErrorRequestHandler } from 'express';
import helmet from 'helmet';

import { mongoConnection } from './configs';
import { router as campgroundsRoutes } from './routes/campgrounds-routes';
import { router as usersRoutes } from './routes/users-routes';
import { ExpressError } from './utils';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.VITE_PORT || 3001;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'"],
      scriptSrc: ["'unsafe-inline'", "'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      workerSrc: ["'self'", 'blob:'],
      objectSrc: [],
      imgSrc: [
        "'self'",
        'blob:',
        'data:',
        'https://res.cloudinary.com/dgjgwco0f/',
        'https://images.unsplash.com/',
        'https://www.theglobeandmail.com/resizer/'
      ],
      fontSrc: ["'self'"]
    }
  })
);

app.use((_req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    `${!isProduction ? '*' : process.env.CLIENT_URL}`
  );
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
