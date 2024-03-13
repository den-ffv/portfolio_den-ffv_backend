import { Router } from "express";
import ProjectController from "../controllers/ProjectController";

const projectRoutes: Router = Router();


projectRoutes.post("/create", ProjectController.createProject);
projectRoutes.get("/get-all", ProjectController.getAllProject);
projectRoutes.get("/get-one/:id", ProjectController.getOneProjectByID);
projectRoutes.put("/update/:id", ProjectController.updateProject);
projectRoutes.patch("/delete/:id", ProjectController.deleteProject);



export default projectRoutes