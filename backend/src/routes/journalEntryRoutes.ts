import express from 'express';
import {
  createJournalEntry,
  listJournalEntriesByUser,
  getJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
} from '../controllers/journalController';
import {
  validateJournalEntryRequest,
  validateUserIdInBody,
  validatePaginationParams,
  validateJournalIdInBody,
} from '../middleware/validation';

const router = express.Router();

router.post('/', validateJournalEntryRequest, createJournalEntry);

router.get(
  '/',
  validateUserIdInBody,
  validatePaginationParams,
  listJournalEntriesByUser,
);

router.get(
  '/:id',
  validateJournalIdInBody,
  validatePaginationParams,
  getJournalEntry,
);

router.put(
  '/:id',
  validateJournalIdInBody,
  validateJournalEntryRequest,
  updateJournalEntry,
);

router.delete('/:id', validateJournalIdInBody, deleteJournalEntry);

export default router;
