import express from 'express';
import cors from 'cors';
import courseProjectRoutes from './routes/courseProjectRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { RequestContext } from '@mikro-orm/core';
import { MikroORM } from '@mikro-orm/mariadb';
import mconfig from './mikro-orm.config.js';

const app = express()
const orm = await MikroORM.init(mconfig);


app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
})

app.use('/project', courseProjectRoutes);
app.use('/auth', userRoutes);

app.use(errorHandler)

export default app;