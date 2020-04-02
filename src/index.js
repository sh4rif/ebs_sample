import { MYSQL_SESSION_OPTIONS, APP_PORT } from "../config";
import MySQLSessionStore from "express-mysql-session";
import { createApp } from "./app";

const app = createApp(new MySQLSessionStore(MYSQL_SESSION_OPTIONS));
app.listen(APP_PORT);
console.log(`app is running at http://localhost:${APP_PORT}`);

// import db from '../models'

// (async () => {

//     // try {
//     //     await connection.authenticate();
//     //     console.log('Connection has been established successfully.');
//     // } catch (error) {
//     //     console.error('Unable to connect to the database:', error);
//     // }
//     // const app = createApp(new MySQLSessionStore(MYSQL_SESSION_OPTIONS));
//     // app.listen(APP_PORT);
//     // console.log(`app is running at http://localhost:${APP_PORT}`);
//     // db.sequelize.sync().then(() => {
//     //     app.listen(APP_PORT, () => {
//     //         console.log(`app is running at http://localhost:${APP_PORT}`);
//     //     });
//     // })
// }
// )();
