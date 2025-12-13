import { Router } from "express";
import { UserAccessResource } from "./user.access.resource";

const router = Router();

router.get('/find-user-access/:value', UserAccessResource.findUserAccess);
router.post('/register-user-access', UserAccessResource.registerUserAccess);
router.post('/update-user-access', UserAccessResource.updateUserAccess);
router.post('/auth-web', UserAccessResource.validateWebUser);

export default router;