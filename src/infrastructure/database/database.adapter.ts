import { SchemaFactory } from '@nestjs/mongoose';
import { createConnection, Connection, disconnect } from 'mongoose';
import { VehicleSchema } from './schema/vehicle.schema';
import { VehicleRepository } from './repository/vehicle.repository';
import { Mock } from './database.mock';
import { config } from '../environment';

const vehicleRepository = new VehicleRepository();

const REPOSITORY_MAP = {
  vehicle: { instance: vehicleRepository, schema: VehicleSchema },
} as const;

export type Repositories = {
  [k in keyof typeof REPOSITORY_MAP as `${k}Repository`]: (typeof REPOSITORY_MAP)[k]['instance'];
};

let DB_CONN: Connection;

const connectServiceDatabase = async (mongoURI: string, testing = false): Promise<Repositories> => {
  DB_CONN = await createConnection(mongoURI, {
    dbName: `${config.get('application.name').split('/')[1]}-${testing ? 'test' : ''}-v4`,
  }).asPromise();

  Object.keys(REPOSITORY_MAP).forEach((key) => {
    const schema = SchemaFactory.createForClass(REPOSITORY_MAP[key].schema);

    schema.post('find', (rawDocs: { _id: string; id: string }[]) => {
      const docs = rawDocs;
      docs.forEach((doc, index: number) => {
        if (docs[index]._id) {
          docs[index].id = docs[index]._id;
          delete docs[index]._id;
        }
      });
    });

    schema.post('findOne', (rawDoc: { _id: string; id: string }) => {
      const doc = rawDoc;
      if (doc && doc._id) {
        doc.id = doc._id;
        delete doc._id;
      }
    });

    schema.methods.parseId = function parseId(): void {
      this._doc.id = this._doc._id;
    };
    schema.queue('parseId', []);

    REPOSITORY_MAP[key].instance.model = DB_CONN.model(
      REPOSITORY_MAP[key].schema.name.replace('Schema', ''),
      schema,
    );
  });

  // dev only - mock test data
  await new Mock(vehicleRepository.model).execute();

  return {
    vehicleRepository: vehicleRepository,
  };
};

export const getConnection = (): Connection => DB_CONN;

export const closeConnection = async (): Promise<void> => {
  await DB_CONN?.destroy();
  await disconnect();
};

export { connectServiceDatabase, vehicleRepository };
