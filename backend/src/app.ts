import express from 'express';
import cors from 'cors';
import courseProjectRoutes from './routes/courseProject.routes.js';
import userRoutes from './routes/user.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { RequestContext } from '@mikro-orm/core';
import { MikroORM } from '@mikro-orm/mariadb';
import mconfig from './mikro-orm.config.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';

const app = express()
const orm = await MikroORM.init(mconfig);


app.use(express.json());
app.use(cors())
app.use(cookieParser())

app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
})

app.use('/project', courseProjectRoutes);
app.use('/me', userRoutes);
app.use('/auth', authRoutes)

app.use(errorHandler)

export default app;