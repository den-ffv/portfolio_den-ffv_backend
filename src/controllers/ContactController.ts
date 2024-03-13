import {Request, Response} from "express";
import ContactService from "../services/contactService";
import contactService from "../services/contactService";

class ContactController {
    async createContact(req: Request, res: Response): Promise<void> {
        try {
            const {name, url} = req.body;

            if ((name.length <= 0 || url.length <= 0)) {
                res.status(400).json({message: "There is an empty field"})
            } else {
                const create = await ContactService.create(name, url);
                res.status(200).json({message: "Contact successfully created", create})
            }
        } catch (err) {
            console.error(err)
            res.status(400).json({message: "Error when creating a contact", err});
        }
    }

    async getContact(req: Request, res: Response): Promise<void> {
        try {
            const get = await ContactService.getAll()

            res.status(200).json({message: "Successfully received contacts", contacts: get})
        } catch (err) {
            console.error(err)
            res.status(400).json({message: "Error when receiving contact"});
        }
    }

    async updateContact(req: Request, res: Response): Promise<void> {
        try {

            const {id} = req.params;
            const {name, url} = req.body;
            if ((name.length <= 0 || url.length <= 0)) {
                res.status(400).json({message: "There is an empty field"})
            }
            const update = await contactService.update(id, name, url)

            console.log(update)

            res.status(200).json({message: "Successfully update a contact by ID", contact: update})
        } catch (err) {
            console.error(err)
            res.status(400).json({message: "Error when updating contact"});
        }
    }

    async deleteContact(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            if(!id || isNaN(+id)){
                res.status(400).json({ message: "Invalid or missing 'id' parameter" });
                return;
            }
            await ContactService.delete(id)

            res.status(200).json({message: "Successfully delete a contact by ID"})
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: `Internal server error: ${err}` });
        }
    }
}

export default new ContactController()