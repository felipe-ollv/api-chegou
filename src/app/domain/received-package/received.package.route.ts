import { Router } from "express";
import { ReceivedPackageResource } from "./received.package.resource";

const router = Router();

router.get('/find-received-package/:value', ReceivedPackageResource.findReceivedPackage);
router.post('/create-received-package', ReceivedPackageResource.registerReceivedPackage);

export default router;