import express from 'express';
import {
  createJournalEntry,
  listJournalEntriesByUser,
  getJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
} from '../controllers/journalEntryController';
import {
  validateJournalEntryRequest,
  validateUserIdInBody,
  validateJournalIdInBody,
  validateJournalIdInParams,
  validatePaginationParams,
} from '../middleware/journalEntry/validation';

const router = express.Router();

router.post('/', validateJournalEntryRequest, createJournalEntry);

router.get(
  '/',
  validateUserIdInBody,
  validatePaginationParams,
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
