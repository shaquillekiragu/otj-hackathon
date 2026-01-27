import { Request, Response } from 'express';
import {
  getTagsByUserService,
  updateUserTagService,
  deleteUserTagService,
} from '../services/tagService';
import { handleError } from './utils/handleError';
import { TagInput } from '../types/payload';

export const getTagsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;
    const tags = await getTagsByUserService(userId);
    res.json({ success: true, tags });
  } catch (error) {
    handleError(
      res,
      error,
      `Failed to get tags for user id: ${req.params.userId}`,
    );
  }
};

export const updateTag = async (req: Request, res: Response) => {
  try {
    const tagId = req.params.tagId as string;
    const userId = req.params.userId as string;
    const updateInput: TagInput = req.body;

    const updatedTag = await updateUserTagService(tagId, userId, updateInput);
    res.json({ success: true, updatedTag });
  } catch (error) {
    handleError(res, error, `Failed to update tag for id: ${req.params.tagId}`);
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const tagId = req.params.tagId as string;
    const userId = req.params.userId as string;
    await deleteUserTagService(tagId, userId);
    res.json({
      success: true,
      message: `Successfully deleted tag: ${req.params.tagId}`,
    });
  } catch (error) {
    handleError(res, error, `Failed to delete tag for id: ${req.params.tagId}`);
  }
};
