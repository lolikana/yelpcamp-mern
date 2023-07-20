import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.

dotenv.config({ path: '../.env.local' });

export const isProduction = process.env.NODE_ENV === 'production';

const mongoDBUri = isProduction
  ? (process.env.MONGO_URI as string)
  : `mongodb://localhost:27017/${process.env.MONGO_DB as string}`;

mongoose.set('strictQuery', false);
// Wait for database to connect, logging an error if there is a problem

async function mongoConnection() {
  await mongoose
    .connect(mongoDBUri)
    .then(() => {
      console.log('MONGO CONNECTION OPEN!!');
    })
    .catch(err => {
      console.log('OH NO MONGO CONNECTION ERROR!!!!');
      console.log(err);
    });
}

export default mongoConnection;
