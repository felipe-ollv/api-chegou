import { Router } from "express";
import { UserProfileResource } from "./user.profile.resource";

const router = Router();

router.get('/find-user-profile/:value', UserProfileResource.findUserProfile);
router.post('/register-user-profile', UserProfileResource.registerUserProfile);
router.post('/refresh-user-profile', UserProfileResource.updateUserProfile);

export default router;