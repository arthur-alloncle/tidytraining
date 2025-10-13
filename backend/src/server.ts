
import app from './app.js';
import { MikroORM } from '@mikro-orm/mariadb';
import mconfig from './mikro-orm.config.js';
import { CourseProject } from './entity/courseProjectEntity.entity.js';
import { execSync } from 'child_process';

// const orm = await MikroORM.init(mconfig);
// const em = orm.em.fork()

// const courseProject = new CourseProject();
// courseProject.title = "First project"
// await orm.schema.refreshDatabase()

// em.persist(courseProject)
// await em.flush()

const server = app.listen(80, () => {
    console.log('server running')
})

// quit on ctrl-c when running docker in terminal
process.on("SIGINT", function onSigint() {
    console.info(
      "Got SIGINT (aka ctrl-c in docker). Graceful shutdown ",
      new Date().toISOString()
    );
    execSync('docker cp react_express_docker-backend-1:/code/migrations/ ./src/migrations/.')
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