import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../utils/apiError';
import { validateRequiredFields } from '../utils/validateRequiredFields';

export const validateJournalEntryRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, title, description, category } = req.body;
    validateRequiredFields({ userId, title, description, category });

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        missingFields: error.metaData?.missingFields ?? [],
      });
    }
    throw error;
  }
};

export const validateUserIdInParams = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.query.userId) {
    return res.status(400).json({
      message: `Failed to fetch all journal entries - missing userId in query params: ${req.query.userId}`,
    });
  }

  next();
};

export const validateJournalIdInParams = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.journalId) {
    return res.status(400).json({
      message: `Failed to fetch journal entry - missing journalId in request params: ${req.params.journalId}`,
    });
  }

  next();
};

export const validatePaginationParams = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

  if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
    return next(
      new ApiError('Invalid pagination parameters', 400, { page, limit }),
    );
  }

  req.query.page = page.toString();
  req.query.limit = limit.toString();

  next();
};

export const validateSearchAndFilterParams = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Validate and sanitize search parameter
  if (req.query.search) {
    const search = req.query.search as string;
    // Basic sanitization - trim whitespace
    req.query.search = search.trim();
  }

  // Validate tags parameter - just ensure it's a string, parsing will happen in controller
  if (req.query.tags && typeof req.query.tags !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Invalid tags parameter format',
    });
  }

  next();
};
