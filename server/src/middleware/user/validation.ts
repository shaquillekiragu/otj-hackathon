import { Request, Response, NextFunction } from 'express';

export const validateUserRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.userId) {
    return res.status(400).json({
      message: `Failed to fetch user - missing id in request params: ${req.params.userId}`,
    });
  }

  next();
};

export const validateNameInBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: `Failed to fetch all users - missing name in request body: ${req.body.name}`,
    });
  }

  next();
};

export const validateExpectedOTJHoursInBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.expectedOTJHours) {
    return res.status(400).json({
      message: `Failed to fetch all users - missing expectedOTJHours in request body: ${req.body.expectedOTJHours}`,
    });
  }

  next();
};

export const validateActualOTJHoursInBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.actualOTJHours) {
    return res.status(400).json({
      message: `Failed to fetch all users - missing actualOTJHours in request body: ${req.body.actualOTJHours}`,
    });
  }

  next();
};

export const validateTotalOTJHoursInBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.totalOTJHours) {
    return res.status(400).json({
      message: `Failed to fetch all users - missing totalOTJHours in request body: ${req.body.totalOTJHours}`,
    });
  }

  next();
};

export const validateLastOTJActivityInBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.lastOTJActivity) {
    return res.status(400).json({
      message: `Failed to fetch all users - missing lastOTJActivity in request body: ${req.body.lastOTJActivity}`,
    });
  }

  next();
};

export const validateCreatedAtInBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.createdAt) {
    return res.status(400).json({
      message: `Failed to fetch all users - missing createdAt in request body: ${req.body.createdAt}`,
    });
  }

  next();
};
