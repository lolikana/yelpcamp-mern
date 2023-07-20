import bodyParser from 'body-parser';
import express from 'express';

import { mongoConnection } from './configs';
import { router as usersRoutes } from './routes/users-routes';
import { ExpressError } from './utils';

const port = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use(usersRoutes);

app.all('*', (_req, _res, next) => {
  next(new ExpressError('Page Not Found!!', 404));
});

mongoConnection()
  .then(() => {
    app.listen(port, () => console.log(`Server started at port: ${port}`));
  })
  .catch(err => console.log(err));
