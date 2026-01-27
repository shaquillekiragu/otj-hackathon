import express from 'express';
import cors from 'cors';
import journalEntryRoutes from './routes/journalEntryRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/journal', journalEntryRoutes);
app.use('/api/user', userRoutes);

export default app;
