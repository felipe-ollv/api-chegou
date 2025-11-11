import { Router } from 'express';

import authUserRoutes from '../auth/user.auth.route';
import condominiumRoute from '../domain/condominium/condominium.route';
import { CondominiumResource } from '../domain/condominium/condominium.resource';
import userRoute from '../domain/user/user.route';
import { UserResource } from '../domain/user/user.resource';


const publicRoutes = Router();

publicRoutes.use('/login', authUserRoutes);
publicRoutes.use('/user/register-user', userRoute.use(UserResource.registerUser));
publicRoutes.use('/condominium/find-condominium/:value', condominiumRoute.use(CondominiumResource.findCondominium));

export default publicRoutes;