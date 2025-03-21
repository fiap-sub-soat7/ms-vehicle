import * as convict from 'convict';
import { readFileSync } from 'fs';

const ROOT = process.cwd();

const PACKAGE: Record<string, string> = JSON.parse(
  readFileSync(process.env.npm_package_json || `${ROOT}/package.json`).toString(),
);

export const config = convict({
  dev: {
    format: 'Boolean',
    default: process.env.NODE_ENV !== 'production',
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  application: {
    name: {
      format: String,
      default: PACKAGE.name,
      env: 'APPLICATION_NAME',
    },
    port: {
      format: 'port',
      default: 3000,
      env: 'APPLICATION_PORT',
    },
    host: {
      format: String,
      default: '0.0.0.0',
      env: 'APPLICATION_HOST',
    },
    version: {
      format: String,
      default: PACKAGE.version,
      env: 'APPLICATION_VERSION',
    },
    service: {
      format: String,
      default: PACKAGE.name.split('-')[2],
    },
  },
  db: {
    api: {
      env: 'DB_SVC_URL',
      format: String,
      default: '',
    },
  },
});

config.validate();
