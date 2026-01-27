import express from 'express';
import {
  createJournalEntry,
  listJournalEntriesByUser,
  getJournalEntry,
  updateJournalEntry,
} from '../controllers/journalController';
import {
  validateJournalEntry,
  validateListJournalEntriesByUser,
  validateGetJournalEntry,
  validatePaginationParams,
} from '../middleware/validation';

const router = express.Router();

router.post('/', validateJournalEntry, createJournalEntry);

router.get(
  '/',
  validateListJournalEntriesByUser,
  validatePaginationParams,
  listJournalEntriesByUser,
);

router.get(
  '/:id',
  validateGetJournalEntry,
  validatePaginationParams,
  getJournalEntry,
);

router.put(
  '/:id',
  validateJournalEntry,
  validateGetJournalEntry,
  updateJournalEntry,
);

export default router;
