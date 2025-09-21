import { Router } from "express";
import express from 'express';
import { UserProfileResource } from "./user.profile.resource";
import { upload } from "../../config/multer-file-storage";
import path from "path";

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

export default router;