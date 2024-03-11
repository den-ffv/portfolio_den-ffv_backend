import { Router } from "express";
import adminRoutes from "./adminRoutes";
import contactRoutes from "./contactRoutes";

const router: Router = Router();

router.use('/admin', adminRoutes);
router.use('/contact', contactRoutes )

export default router