import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env.local' });

const mongoDBUri = process.env.MONGO_URI as string;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const prisma: PrismaClient = new PrismaClient({
  datasources: { db: { url: mongoDBUri } }
});

export default prisma;
