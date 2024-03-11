import {Request, Response} from "express";
import AdminService from "../services/adminService";
import pool from "../pool/pool";

interface CreateAdminRequest {
    login: string,
    password: string,
    name: string,
    surname: string,
    position: string,
    about: string,
}
interface GetAdminRequest {
    login: string,
    password: string,
}

class AdminController {
    async createAdmin(req: Request<{}, {}, CreateAdminRequest>, res: Response): Promise<void> {
        try {
            const {login, password, name, surname, position, about} = req.body;

            const admin = await AdminService.create(login, password, name, surname, position, about);

            res.status(200).json({message: "Successful creation admin", admin});
        } catch (err) {
            console.error(err);
            res.status(400).json({message: `Error creating admin: ${err}`});
        }
    }
    async getAdmin(req: Request<{}, {}, GetAdminRequest>, res: Response) {
        try {
            const {login, password} = req.body;

            const admin = await AdminService.get(login, password);

            res.status(200).json({message: "Successful get admin", admin})
        } catch (err) {
            console.error(err)
            return res.status(400).json({message: `Error getting admin: ${err}`})
        }
    }

    async updateAdmin(req: Request, res: Response) {
        try {
            const {name, surname, position, about} = req.body;

            const updateData = await AdminService.update(name, surname, position, about);

            return res.status(200).json({message: "Successful update data", admin: updateData})
        } catch (err) {
            console.error(err)
            return res.status(400).json({message: `Error updating admin: ${err}`})
        }
    }
    async changeStatus(req: Request, res: Response): Promise<void>{
        try {

            const {rows} = await pool.query(`SELECT job_secrch_status FROM admin`);
            const newStatus = !rows[0].job_secrch_status;

            await pool.query(`UPDATE admin SET job_secrch_status = $1`, [newStatus]);

            res.status(200).json({message: `Successful update job status ${newStatus}`});
        }catch (err){
            res.status(400).json({message: `Error changing job status: ${err}`})
        }
    }
}

export default new AdminController()