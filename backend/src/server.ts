
import app from './app.js';
import { MikroORM } from '@mikro-orm/mariadb';
import mconfig from './mikro-orm.config.js';
import { CourseProject } from './entity/courseProjectEntity.entity.js';

// const orm = await MikroORM.init(mconfig);
// const em = orm.em.fork()

// const courseProject = new CourseProject();
// courseProject.title = "First project"
// await orm.schema.refreshDatabase()

// em.persist(courseProject)
// await em.flush()

app.listen(80, () => {
    console.log('server running')
})