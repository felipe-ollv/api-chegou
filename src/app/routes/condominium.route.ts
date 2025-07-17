import { Router } from "express";
import { CondominiumResource } from "../resource/condominium.resource";

const router = Router();

router.get('/find-condominium/:value', CondominiumResource.findCondominium);
router.get('/find-all', CondominiumResource.findAllCondominium);
router.post('/create', CondominiumResource.register);
router.put('/update', CondominiumResource.update);
router.delete('/delete/:value', CondominiumResource.delete);

export default router;