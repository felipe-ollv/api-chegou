import { Router } from "express";
import { CondominiumController } from "../../resources/condominium/condominium.resource";

const router = Router();

router.get('/find-condominium/:value', CondominiumController.findCondominium);
router.get('/find-all', CondominiumController.findAllCondominium);
router.post('/create', CondominiumController.register);
router.put('/update', CondominiumController.update);
router.delete('/delete/:value', CondominiumController.delete);

export default router;