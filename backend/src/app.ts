import express from 'express';
import cors from 'cors';
import courseProjectRoutes from './routes/courseProjectRoutes.js';

const app = express()

app.use(express.json());
app.use(cors())

app.use('/project', courseProjectRoutes);

export default app;