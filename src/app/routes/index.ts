import { Router } from 'express';

import condominiumRoutes from '../domain/condominium/condominium.route';
import userRoutes from '../domain/user/user.route';
import userProfileRoutes from '../domain/user-profile/user.profile.route';
import userAccessRoutes from '../domain/user-access/user.access.route';
import notificationRoutes from '../domain/notification/notification.route';
import noteDataRoutes from '../domain/note-data/note.data.route';
import receivedPackageRoutes from '../domain/received-package/received.package.route'

const router = Router();

router.use('/condominium', condominiumRoutes);
router.use('/user', userRoutes);
router.use('/user-profile', userProfileRoutes);
router.use('/user-access', userAccessRoutes);
router.use('/notification', notificationRoutes);
router.use('/note-data', noteDataRoutes);
router.use('/received-package', receivedPackageRoutes);

export default router;
