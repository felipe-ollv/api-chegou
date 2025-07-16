import { Router } from "express";
import { UserProfileResource } from "../../resources/user-profile/user.profile.resource";

const router = Router();

router.get('/find-user-profile/:value', UserProfileResource.findUserProfile);
router.post('/register-user-profile', UserProfileResource.registerUserProfile);

export default router;