import { connectServiceDatabase, getConnection, Repositories } from '@/adapter/database/database.adapter';
import { readFileSync } from 'fs';

// TODO: another server/database (local) to tests, this is using online database
const CONN_STRING = "mongodb://team75:FIAP%23Team75@localhost:27017"

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
