import { closeTestConnection, createTestConnection } from './database.helper';

global.beforeAll(async () => {
  await createTestConnection();
});

global.afterAll(async () => {
  await closeTestConnection();
});
