import { Router } from "express";
import adminRoutes from "./adminRoutes";

const router: Router = Router();

router.use('/admin', adminRoutes)

export default router