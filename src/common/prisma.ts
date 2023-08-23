import { PrismaClient } from '@prisma/client';
import { config } from './config';
import { dbConnection } from './test.config';

const isTest: boolean = config.nodeEnvironment === 'test';
const prisma: PrismaClient = isTest
  ? new PrismaClient({ ...dbConnection })
  : new PrismaClient();

export default prisma;
