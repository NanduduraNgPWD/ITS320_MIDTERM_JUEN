import { createUser, getUsers, getUserProfile } from "../controller/userController.js";
import e from "express";
import auth from '../middleware/auth.js';

export const router = e.Router();

router.post('/create', createUser);
router.get('/', getUsers);

router.get('/:id', auth, getUserProfile);