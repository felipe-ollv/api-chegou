import { Router } from "express";
import { NotificationResource } from "./notification.resource";

const router = Router();

router.get('/find-notification/:value', NotificationResource.findNotification);
router.post('/create-notification', NotificationResource.createNotification);
router.post('/update-notification', NotificationResource.updateNotification);

export default router;