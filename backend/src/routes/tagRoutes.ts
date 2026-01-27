import express from 'express';
import {
  getTagsByUser,
  updateTag,
  deleteTag,
} from '../controllers/tagController';

const router = express.Router();

router.get('/:userId', getTagsByUser);

router.put('/:userId/:tagId', updateTag);

router.delete('/:userId/:tagId', deleteTag);

export default router;
