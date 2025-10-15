import express from 'express';
import cors from 'cors';
import courseProjectRoutes from './routes/courseProjectRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express()

app.use(express.json());
app.use(cors())

app.use('/project', courseProjectRoutes);
app.use('/auth', userRoutes);

export default app;