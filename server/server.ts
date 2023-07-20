import dotenv from 'dotenv';
import express from 'express';

import { ExpressError } from './utils';

dotenv.config();

const port = 3001;
const app = express();

app.all('*', (_req, _res, next) => {
  next(new ExpressError('Page Not Found!!', 404));
});

app.listen(port, () => console.log(`Server started at port: ${port}`));
