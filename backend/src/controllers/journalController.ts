import { Request, Response } from 'express';
import {
  createJournalEntryService,
  listJournalEntriesByUserIdService,
  getJournalEntryByIdService,
  updateJournalEntryService,
  deleteJournalEntryService,
} from '../services/journalEntryService';
import { JournalIdInput } from '../types/payload';
import { ApiError } from '../utils/apiError';

export const createJournalEntry = async (req: Request, res: Response) => {
  try {
    const journalEntry = await createJournalEntryService(req.body);

    res.status(201).json({ success: true, journalEntry });
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        missingFields: error.metaData?.missingFields ?? [],
      });
    }

    console.error('Unexpected error creating journal entry:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to create journal entry',
    });
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
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    console.error('Unexpected error listing journal entries:', error);

    res.status(500).json({
      success: false,
      message: `Failed to list journal entries for user: ${req.query.userId}`,
    });
  }
};

export const getJournalEntry = async (
  req: Request<JournalIdInput>,
  res: Response,
) => {
  try {
    const { page, limit } = req.query;

    const journalEntry = await getJournalEntryByIdService(
      req.body.id,
      page as string,
      limit as string,
    );

    res.status(200).json({ success: true, journalEntry });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    console.error('Unexpected error getting journal entry', error);

    res.status(500).json({
      success: false,
      message: `Failed to get journal entry for id: ${req.params.id}`,
    });
  }
};

export const updateJournalEntry = async (req: Request, res: Response) => {
  try {
    const updatedJournalEntry = await updateJournalEntryService(req.body);

    res.status(200).json({ success: true, updatedJournalEntry });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    console.error('Unexpected error updating journal entry:', error);

    res.status(500).json({
      success: false,
      message: `Failed to update journal entry ${req.body.id} for user: ${req.body.userId}`,
    });
  }
};
export const deleteJournalEntry = async (req: Request, res: Response) => {
  try {
    const deletedCount = await deleteJournalEntryService(req.body.id);

    res.status(200).json({
      success: true,
      message: `Successfully deleted journal entry: ${req.body.id}`,
      deletedCount,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    console.error('Unexpected error deleting journal entry:', error);

    res.status(500).json({
      success: false,
      message: `Failed to delete journal entry ${req.body.id} for user: ${req.body.userId}`,
    });
  }
};
