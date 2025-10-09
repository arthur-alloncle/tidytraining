"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mariadb_1 = require("@mikro-orm/mariadb");
const reflection_1 = require("@mikro-orm/reflection");
const mconfig = {
    // for simplicity, we use the SQLite database, as it's available pretty much everywhere
    driver: mariadb_1.MariaDbDriver,
    dbName: 'tidytraining',
    // folder-based discovery setup, using common filename suffix
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    // we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
    // check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
    metadataProvider: reflection_1.TsMorphMetadataProvider,
    // enable debug mode to log SQL queries and discovery information
    debug: true,
};
exports.default = mconfig;
