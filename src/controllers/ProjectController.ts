import {Request, Response} from "express";
import ProjectService from "../services/projectService";

class ProjectController{
    async createProject(req: Request, res: Response): Promise<void>{
        try{
            const {name, descriptio, start_data, end_date, url, images, keywords, category} = req.body;

            const create = ProjectService.create(name, descriptio, start_data, end_date, url, images, keywords, category)

            res.status(200).json({message: "Successful create project post"})
        }catch (err){
            console.error(err)
            res.status(400).json({message: "Error:", err})
        }

    }
    async getAllProject(req: Request, res: Response): Promise<void>{
        try{

        }catch (err){
            console.error(err)
            res.status(400).json({message: "Error:", err})
        }

    }
    async getOneProjectByID(req: Request, res: Response): Promise<void>{
        try{
            const {id} = req.params;
        }catch (err){
            console.error(err)
            res.status(400).json({message: "Error:", err})
        }

    }
    async updateProject(req: Request, res: Response): Promise<void>{
        try{
            const {id} = req.params;
        }catch (err){
            console.error(err)
            res.status(400).json({message: "Error:", err})
        }

    }
    async deleteProject(req: Request, res: Response): Promise<void>{
        try{
            const {id} = req.params;
        }catch (err){
            console.error(err)
            res.status(400).json({message: "Error:", err})
        }

    }
}

export default new ProjectController()