import { Router } from 'express';

import authUserRoutes from '../auth/user.auth.route';
import condominiumRoute from '../domain/condominium/condominium.route';
import { CondominiumResource } from '../domain/condominium/condominium.resource';

const publicRoutes = Router();

publicRoutes.use('/login', authUserRoutes);
publicRoutes.use('/condominium/find-all', condominiumRoute.use(CondominiumResource.findAllCondominium));

export default publicRoutes;