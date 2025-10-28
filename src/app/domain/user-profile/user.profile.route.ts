import { Router } from "express";
import { UserProfileResource } from "./user.profile.resource";
import { upload } from "../../config/multer-image-storage";

const router = Router();

router.get('/find-user-profile/:value', UserProfileResource.findUserProfile);
router.post('/register-user-profile', UserProfileResource.registerUserProfile);
router.post('/refresh-user-profile', UserProfileResource.updateUserProfile);
router.post(
  '/image-user-profile',
  upload.single('file'),
  UserProfileResource.imageUserProfile
);
router.get('/uploads/:value', UserProfileResource.fetchImageUserProfile);
router.post('/exclude-account', UserProfileResource.excludeUserProfile);

export default router;