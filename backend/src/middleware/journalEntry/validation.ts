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

export const validateUserIdInBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.userId) {
    return res.status(400).json({
      message: `Failed to fetch all journal entries - missing userId in request body: ${req.body.userId}`,
    });
  }

  next();
};

export const validateJournalIdInBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.id) {
    return res.status(400).json({
      message: `Failed to fetch journal entry - missing journalId in request body: ${req.body.id}`,
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

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: `Failed to fetch user - missing userId: ${req.params.id}`,
    });
  }

  next();
};