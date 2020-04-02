import Sequelize from "sequelize";
import config from "./config";
import { env } from "./";

export const connection = new Sequelize(config[env]);

export default connection;
