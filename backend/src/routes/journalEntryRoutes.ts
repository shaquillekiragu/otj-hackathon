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
  validateJournalIdInParams,
  validatePaginationParams,
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
  validateJournalIdInParams,
  validatePaginationParams,
  getJournalEntry,
);

router.put(
  '/:id',
  validateJournalEntryRequest,
  validateJournalIdInParams,
  updateJournalEntry,
);

router.delete('/:id', validateJournalIdInParams, deleteJournalEntry);

export default router;
