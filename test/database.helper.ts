import { readFileSync } from 'fs';
import {
  connectServiceDatabase,
  getConnection,
  Repositories,
} from '@/infrastructure/database/database.adapter';

// TODO: another server/database (local) to tests, this is using online database
const CONN_STRING =
  process.env.DB_SVC_URL ||
  readFileSync('.env.sample')
    .toString()
    .match(/(?<=DB_SVC_URL=).*$/)[0]
    .replace('db-svc-mongo', 'localhost');

let repositories: Repositories;

export const createTestConnection = async (): Promise<void> => {
  repositories = await connectServiceDatabase(CONN_STRING, true);
};

export const getTestRepositories = (): Repositories => repositories;

export const closeTestConnection = async (): Promise<void> => {
  const conn = getConnection();
  await conn.dropDatabase();
  await conn.destroy();
};
