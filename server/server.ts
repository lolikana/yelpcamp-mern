import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const port = 3001;
const app = express();

app.listen(port, () => console.log(`Server started at port: ${port}`));
