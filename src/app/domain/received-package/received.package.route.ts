import { Router } from "express";
import { ReceivedPackageResource } from "./received.package.resource";

const router = Router();

router.get('/find-received-package/:value', ReceivedPackageResource.findReceivedPackage);
router.post('/create-received-package', ReceivedPackageResource.registerReceivedPackage);
router.put('/update-received-package', ReceivedPackageResource.updateReceivedPackage)

export default router;