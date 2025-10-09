import { Options, MariaDbDriver } from "@mikro-orm/mariadb";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { CourseProjectEntity } from './entity/courseProjectEntity.entity.js'
import { readFileSync } from "fs";

let dbPassword = process.env.DATABASE_PASSWORD;
if (dbPassword && dbPassword.startsWith('/')) {
  try {
    dbPassword = readFileSync(dbPassword, 'utf-8').trim();
  } catch (err) {
    console.error("Erreur lecture secret DB:", err);
  }
}

const mconfig: Options = {
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    metadataProvider: TsMorphMetadataProvider,
    debug: true,

    driver: MariaDbDriver,
    driverOptions: {
      allowPublicKeyRetrieval: true
    },
    host: process.env.DATABASE_HOST || "localhost",
    dbName: process.env.DATABASE_DB,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    //@ts-ignore
    password: dbPassword,

    // discovery: {
    //   warnWhenNoEntities: false, // by default, discovery throws when no entity is processed
    //   requireEntitiesArray: true, // force usage of class references in `entities` instead of paths
    //   alwaysAnalyseProperties: false, // do not analyse properties when not needed (with ts-morph)
    // },
  };


  
  export default mconfig;