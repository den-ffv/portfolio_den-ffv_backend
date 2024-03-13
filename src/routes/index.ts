import { Router } from "express";
import adminRoutes from "./adminRoutes";
import contactRoutes from "./contactRoutes";
import projectRoutes from "./projectRoutes";

const router: Router = Router();

router.use('/admin', adminRoutes);
router.use('/contact', contactRoutes )
router.use('/project', projectRoutes )

export default router