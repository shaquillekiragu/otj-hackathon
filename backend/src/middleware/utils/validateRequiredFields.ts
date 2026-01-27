import { ApiError } from '../../utils/apiError';

export const validateRequiredFields = (
  fields: Record<string, unknown>,
  message = 'Missing required fields',
  statusCode = 400,
) => {
  const missingFields = Object.entries(fields)
    .filter(
      ([_, value]) => value === undefined || value === null || value === '',
    )
    .map(([key]) => key);

  if (missingFields.length > 0) {
    throw new ApiError(`${message}`, statusCode, {
      missingFields,
    });
  }
};
