import app from './app.js';
import { MikroORM } from '@mikro-orm/mariadb';
import mconfig from './mikro-orm.config.js';
const orm = await MikroORM.init(mconfig);
console.log(orm.em);
console.log(orm.schema);
app.listen(80, () => {
    console.log('server running');
});
