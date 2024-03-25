import bcrypt from "bcryptjs";
import pool from "../pool/pool";
import TokenService from "./tokenService";
import Admin from "../models/AdminModel";
import {where} from "sequelize";
import {throws} from "node:assert";

interface AdminData {
    id: string;
    login: string;
    password: string;
    name: string;
    surname: string;
    position: string,
    about: string,
    job_search_status: boolean;
}

interface AdminServiceResponse {
    admin: AdminData;
    token: string;
}

class AdminService {
    async create(login: string, password: string, name: string, surname: string, position: string, about: string): Promise<AdminServiceResponse> {
        const hashPassword = await bcrypt.hash(password, 3);

        const createAdmin = await Admin.create({
            login: login,
            password: hashPassword,
            name: name,
            surname: surname,
            position: position,
            about: about,
        })
        console.log(createAdmin.dataValues)
        if (createAdmin.dataValues) {
            const admin: AdminData = createAdmin.dataValues;
            const token: string = TokenService.generateToken(admin);

            return {admin, token};

        } else {
            throw new Error("Failed to create administrator")
        }
    }

    async get(login: string, password: string) {
        // const getAdmin = await pool.query(`SELECT * FROM admin WHERE login = $1`, [login]);

        const getAdmin = await Admin.findOne({
            where: {login: login}
        })
        if (!getAdmin) {
            throw new Error("Admin was not found");
        }
        const validPassword = bcrypt.compareSync(password, getAdmin.dataValues.password);
        if (!validPassword) {
            throw new Error("The password is not correct")
        }
        const admin: AdminData = getAdmin.dataValues;
        const token: string = TokenService.generateToken(admin);

        return {admin, token}
    }
    async update(name: string, surname: string, position: string, about: string) {
        const [affectedRowsCount, updatedAdmins] = await Admin.update(
            {name, surname, position, about},
            {
                returning: true,
                where: {}
            }
        );
        console.log(`${affectedRowsCount} admins updated.`);
        console.log(updatedAdmins)

        if (updatedAdmins && updatedAdmins.length > 0) {
            console.log('Updated admins:', updatedAdmins);
        } else {
            console.log('No admins were updated.');
        }
        return updatedAdmins[0];
    }

    async updateJodStatus(){
        const admin: AdminData | null = await Admin.findOne<AdminData | any>({
            attributes: ['job_search_status']
        });
        if (admin === null) {
              throw new Error('Admin not found.');
        }
        const newStatus = !admin.job_search_status;
        await Admin.update(
            { job_search_status: newStatus },
            { where: {} }
        );
        return newStatus;
    }
}

export default new AdminService()
