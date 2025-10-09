import { MariaDbDriver } from "@mikro-orm/mariadb";
import { CourseProjectEntity } from './entity/courseProjectEntity.entity.js';
const mconfig = {
    // for simplicity, we use the SQLite database, as it's available pretty much everywhere
    // driver: MariaDbDriver,
    // dbName: 'tidytraining',
    // folder-based discovery setup, using common filename suffix
    entities: [CourseProjectEntity],
    entitiesTs: [CourseProjectEntity],
    // we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
    // check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
    // metadataProvider: TsMorphMetadataProvider,
    // enable debug mode to log SQL queries and discovery information
    debug: true,
    driver: MariaDbDriver,
    driverOptions: {
        allowPublicKeyRetrieval: true
    },
    host: process.env.DATABASE_HOST || "localhost",
    dbName: process.env.DATABASE_DB,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    discovery: {
        warnWhenNoEntities: false, // by default, discovery throws when no entity is processed
        requireEntitiesArray: true, // force usage of class references in `entities` instead of paths
        alwaysAnalyseProperties: false, // do not analyse properties when not needed (with ts-morph)
    },
};
export default mconfig;
