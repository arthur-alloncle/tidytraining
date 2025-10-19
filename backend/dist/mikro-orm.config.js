import { MariaDbDriver } from "@mikro-orm/mariadb";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { TSMigrationGenerator } from "@mikro-orm/migrations";
import { readFileSync } from "fs";
let dbPassword = process.env.DATABASE_PASSWORD;
if (dbPassword && dbPassword.startsWith("/")) {
    try {
        dbPassword = readFileSync(dbPassword, "utf-8").trim();
    }
    catch (err) {
        console.error("Erreur lecture secret DB:", err);
    }
}
const mconfig = {
    entities: ["dist/**/*.entity.js"],
    entitiesTs: ["src/**/*.entity.ts"],
    metadataProvider: TsMorphMetadataProvider,
    debug: true,
    driver: MariaDbDriver,
    // driverOptions: {
    //   allowPublicKeyRetrieval: true,
    // },
    host: process.env.DATABASE_HOST || "localhost",
    dbName: 'tidytraining',
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    //@ts-ignore
    password: dbPassword,
    migrations: {
        tableName: "mikro_orm_migrations",
        path: "./migrations/.",
        pathTs: './migrations/.',
        glob: "!(*.d).{js,ts,cjs}",
        silent: false,
        transactional: true,
        disableForeignKeys: false,
        allOrNothing: true,
        dropTables: true,
        safe: false,
        snapshot: true,
        emit: "ts",
        generator: TSMigrationGenerator,
        fileName: (timestamp, name) => `Migration${timestamp}${name ? "_" + name : ""}`,
    },
};
export default mconfig;
