import { MikroORM } from "@mikro-orm/core";
import { MariaDbDriver } from "@mikro-orm/mariadb";
const database = MikroORM.init({
    driver: MariaDbDriver,
    host: process.env.DATABASE_HOST || "localhost",
    dbName: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
});
export default database;
