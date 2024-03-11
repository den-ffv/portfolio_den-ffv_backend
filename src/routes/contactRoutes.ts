import { Router } from "express";
import ContactController from "../controllers/ContactController";

const contactRoutes: Router = Router();


contactRoutes.post("/create-contact", ContactController.createContact);
contactRoutes.get("/get-contact", ContactController.getContact);
contactRoutes.put("/update-contact/:id", ContactController.updateContact);
contactRoutes.delete("/delete-contact/:id", ContactController.deleteContact );


export default contactRoutes