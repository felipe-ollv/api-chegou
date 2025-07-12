import { Router } from "express";
import { UserResource } from "../../resources/user/user.resource";

const router = Router();

router.get('/find-user/value', UserResource.findUser);
router.post('/register-user', UserResource.registerUser);

export default router;