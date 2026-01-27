export const getPagination = (page?: string, limit?: string) => {
  const pageNum = parseInt(page as string) || 1;
  const limitNum = parseInt(limit as string) || 5;
  const skip = (pageNum - 1) * limitNum;

  return {
    page: pageNum,
    limit: limitNum,
    skip,
  };
};
