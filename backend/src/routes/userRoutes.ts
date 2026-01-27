import express from 'express';
import { getUser } from '../controllers/userController';
import { validateUserRequest } from '../middleware/user/validation';

const router = express.Router();

router.get('/:userId', validateUserRequest, getUser);

export default router;
