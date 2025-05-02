import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
// import { body } from "express-validator";

const router = Router();

router.post('/create', UserController.create);
router.get('/fetch/:phone_number', UserController.fetchUser)

export default router;
