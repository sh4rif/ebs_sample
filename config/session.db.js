import database from "./config";
import { env } from "./index";

const options = database[env];
const ONE_HOUR = 1000 * 60 * 60;
const THIRTY_MINUTES = ONE_HOUR / 2;
const TWO_HOUR = ONE_HOUR * 2;

export const SESSION_ABSOLUTE_TIMEOUT = +(
  process.env.SESSION_ABSOLUTE_TIMEOUT || TWO_HOUR
);

export const MYSQL_SESSION_OPTIONS = {
  host: options.host,
  port: options.port,
  user: options.username,
  password: options.password,
  database: options.database,
  expiration: THIRTY_MINUTES
};
