import express from 'express';
import cors from 'cors';
import journalEntryRoutes from './routes/journalEntryRoutes';
import tagRoutes from './routes/tagRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/journal', journalEntryRoutes);
app.use('/api/tags', tagRoutes);

export default app;
