import { Request, Response } from 'express';
import {
  createJournalEntryService,
  getJournalEntryByIdService,
  listJournalEntriesByUserIdService,
  updateJournalEntryService,
  deleteJournalEntryService,
} from '../services/journalEntryService';
import { handleError } from './utils/handleError';

export const createJournalEntry = async (req: Request, res: Response) => {
  try {
    const journalEntry = await createJournalEntryService(req.body);
    res.status(201).json({ success: true, journalEntry });
  } catch (error) {
    handleError(res, error, 'Failed to create journal entry');
  }
};

export const getJournalEntry = async (req: Request, res: Response) => {
  try {
    const { journalId } = req.params;
    const { page, limit } = req.query;

    const journalEntry = await getJournalEntryByIdService(
      journalId as string,
      page as string,
      limit as string,
    );
    res.status(200).json({ success: true, journalEntry });
  } catch (error) {
    handleError(
      res,
      error,
      `Failed to get journal entry for id: ${req.params.id}`,
    );
  }
};

export const listJournalEntriesByUser = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const journalEntries = await listJournalEntriesByUserIdService(
      req.body.userId,
      page as string,
      limit as string,
    );
    res.status(200).json({ success: true, journalEntries });
  } catch (error) {
    handleError(
      res,
      error,
      `Failed to list journal entries for user: ${req.query.userId}`,
    );
  }
};

export const updateJournalEntry = async (req: Request, res: Response) => {
  try {
    const updatedJournalEntry = await updateJournalEntryService(
      req.params.journalId as string,
      req.body,
    );
    res.status(200).json({ success: true, updatedJournalEntry });
  } catch (error) {
    handleError(
      res,
      error,
      `Failed to update journal entry ${req.params.journalId} for user: ${req.body.userId}`,
    );
  }
};

export const deleteJournalEntry = async (req: Request, res: Response) => {
  try {
    await deleteJournalEntryService(req.params.journalId as string);
    res.status(200).json({
      success: true,
      message: `Successfully deleted journal entry: ${req.params.journalId}`,
    });
  } catch (error) {
    handleError(
      res,
      error,
      `Failed to delete journal entry: ${req.params.journalId}`,
    );
  }
};
