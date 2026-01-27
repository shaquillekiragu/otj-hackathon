import express from 'express';
import { getUser } from '../controllers/userController';
import { validateUserRequest, validateNameInBody, validateExpectedOTJHoursInBody, validateActualOTJHoursInBody, validateTotalOTJHoursInBody, validateLastOTJActivityInBody, validateCreatedAtInBody } from '../middleware/user/validation';

const router = express.Router();

router.get('/:id', validateUserRequest, getUser)

export default router;