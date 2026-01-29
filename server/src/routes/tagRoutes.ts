import express from 'express';
import {
  createTag,
  getTagsByUser,
  updateTag,
  deleteTag,
} from '../controllers/tagController';

const router = express.Router();

router.post('/', createTag);

router.get('/:userId', getTagsByUser);

router.put('/:userId/:tagId', updateTag);

router.delete('/:userId/:tagId', deleteTag);

export default router;
