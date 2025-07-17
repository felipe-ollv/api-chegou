import { Router } from "express";
import { NotificationResource } from "../resource/notification.resource";

const router = Router();

router.get('/find-notification/:value', NotificationResource.findNotification);

export default router;