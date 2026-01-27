import express from 'express';
import { getUser } from '../controllers/userController';
import { validateUser } from '../middleware/validation';

const router = express.Router();

router.get('/:id', validateUser, getUser)

export default router;