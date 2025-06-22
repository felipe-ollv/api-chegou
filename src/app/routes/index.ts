import { Router } from 'express';
import condominiumRoutes from './condominium/condominium.route';

const router = Router();

router.use('/condominium', condominiumRoutes);

export default router;
