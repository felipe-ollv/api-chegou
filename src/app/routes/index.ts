import { Router } from 'express';
import condominiumRoutes from './condominium.route';
import userRoutes from './user.route';
import userProfileRoutes from './user.profile.route';
import userAccessRoutes from './user.access.route';
import notificationRoutes from './notification.route';
import noteDataRoutes from './note.data.route';
import receivedPackageRoutes from './received.package.route'

const router = Router();

router.use('/condominium', condominiumRoutes);
router.use('/user', userRoutes);
router.use('/user-profile', userProfileRoutes);
router.use('/user-access', userAccessRoutes);
router.use('/notification', notificationRoutes);
router.use('/note-data', noteDataRoutes);
router.use('/received-package', receivedPackageRoutes);

export default router;
