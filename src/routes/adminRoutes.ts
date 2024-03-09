import { Router } from "express";
import AdminController from "../controllers/AdminController";

const adminRoutes: Router = Router();


adminRoutes.post("/create", AdminController.createAdmin);
adminRoutes.get("/login", AdminController.getAdmin);
adminRoutes.put("/update", AdminController.updateAdmin);
adminRoutes.patch("/status", AdminController.changeStatus);



export default adminRoutes