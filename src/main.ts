import { config } from './infrastructure/environment';
import { connectServiceDatabase } from './infrastructure/database/database.adapter';
import { httpApp } from './presentation/api/bootstrap';

/** Start database connection */
void connectServiceDatabase(config.get('db.api'));

/** Start HTTP application */
void httpApp();
