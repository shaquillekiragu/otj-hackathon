import express from 'express';
import cors from 'cors';
import journalEntryRoutes from './routes/journalEntryRoutes';
import tagRoutes from './routes/tagRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/journals', journalEntryRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/users', userRoutes);

export default app;
