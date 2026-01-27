import express from 'express';
import cors from 'cors';
import journalEntryRoutes from './routes/journalEntryRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/journal', journalEntryRoutes);

export default app;
