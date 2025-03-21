import { config } from './environment';
import { httpApp } from './adapter/api/bootstrap';
import { connectServiceDatabase } from './adapter/database/database.adapter';

/** Start database connection */
void connectServiceDatabase(config.get('db.api'));

/** Start HTTP application */
void httpApp();
