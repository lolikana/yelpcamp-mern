import express from 'express';

import { mongoConnection } from './configs';
import { router as usersRoutes } from './routes/users-routes';
import { ExpressError } from './utils';

mongoConnection().catch(err => console.log(err));

const port = process.env.PORT || 3001;
const app = express();

app.use(usersRoutes);
app.use('/', (_req, res) => res.send('Hello World'));

app.all('*', (_req, _res, next) => {
  next(new ExpressError('Page Not Found!!', 404));
});

app.listen(port, () => console.log(`Server started at port: ${port}`));
