import { Router } from "express";
import { UserAccessResource } from "../../resources/user-access/user.access.resource";

const router = Router();

router.get('/find-user-access/value', UserAccessResource.findUserAccess);
router.post('/register-user-access', UserAccessResource.registerUserAccess);

export default router;