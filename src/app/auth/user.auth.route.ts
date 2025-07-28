import { Router } from "express";
import { UserAuthResource } from "./user.auth.resource";

const router = Router();

router.post('/user', UserAuthResource.userAuthUser);

export default router;