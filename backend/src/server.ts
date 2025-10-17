
import app from './app.js';
import { MikroORM } from '@mikro-orm/mariadb';
import mconfig from './mikro-orm.config.js';
import { CourseProject } from './entity/courseProject.entity.js';
import { execSync } from 'child_process';


// Uncomment following lines to refresh database schema
// const orm = await MikroORM.init(mconfig);
// await orm.schema.refreshDatabase()


const server = app.listen(80, () => {
    console.log('server running')
})

// quit on ctrl-c when running docker in terminal
process.on("SIGINT", function onSigint() {
    console.info(
      "Got SIGINT (aka ctrl-c in docker). Graceful shutdown ",
      new Date().toISOString()
    );
    execSync('docker cp tidytraining-backend-1:/code/migrations/. ./src/migrations/.')
    shutdown();
  });
  
  // quit properly on docker stop
  process.on("SIGTERM", function onSigterm() {
    console.info(
      "Got SIGTERM (docker container stop). Graceful shutdown ",
      new Date().toISOString()
    );
    shutdown();
  });

  // shut down server
function shutdown() {
    server.close(function onServerClosed(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      process.exit(0);
    });
  }