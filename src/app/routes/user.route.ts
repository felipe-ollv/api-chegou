import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
// import { body } from "express-validator";

const router = Router();

router.post('/create', UserController.create);

export default router;
