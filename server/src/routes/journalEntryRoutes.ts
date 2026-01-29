import express from 'express';
import {
  createJournalEntry,
  getJournalEntry,
  listJournalEntriesByUser,
  updateJournalEntry,
  deleteJournalEntry,
} from '../controllers/journalEntryController';
import {
  validateJournalEntryRequest,
  validateUserIdInParams,
  validateJournalIdInParams,
  validatePaginationParams,
  validateSearchAndFilterParams,
} from '../middleware/journalEntry/validation';

const router = express.Router();

router.post('/', validateJournalEntryRequest, createJournalEntry);

router.get(
  '/',
  validateUserIdInParams,
  validatePaginationParams,
  validateSearchAndFilterParams,
  listJournalEntriesByUser,
);

router.get(
  '/:journalId',
  validateJournalIdInParams,
  validatePaginationParams,
  getJournalEntry,
);

router.put(
  '/:journalId',
  validateJournalIdInParams,
  validateJournalEntryRequest,
  updateJournalEntry,
);

router.delete('/:journalId', validateJournalIdInParams, deleteJournalEntry);

export default router;
