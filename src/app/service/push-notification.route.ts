import { Router } from "express";
import { PushNotificationResource } from './push-notification.resource';

const router = Router();

router.post('/register-token-notification', PushNotificationResource.registerToken);

export default router;