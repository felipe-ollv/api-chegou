import { Router } from "express";
import { CondominiumController } from "../../controllers/condominium/condominium.controller";

const router = Router();

router.post('/create', CondominiumController.register);

export default router;