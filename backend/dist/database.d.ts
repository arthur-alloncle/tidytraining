import { MikroORM } from "@mikro-orm/core";
import { MariaDbDriver } from "@mikro-orm/mariadb";
declare const database: Promise<MikroORM<MariaDbDriver, import("@mikro-orm/mariadb").EntityManager<MariaDbDriver> & import("@mikro-orm/core").EntityManager<import("@mikro-orm/core").IDatabaseDriver<import("@mikro-orm/core").Connection>>>>;
export default database;
