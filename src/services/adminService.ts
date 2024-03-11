import bcrypt from "bcryptjs";
import pool from "../pool/pool";
import TokenService from "./tokenService";

interface AdminData {
    login: string;
    password: string;
    name: string;
    surname: string;
    email: string;
}

interface AdminServiceResponse {
    admin: AdminData;
    token: string;
}

class AdminService {
    async create(login: string, password: string, name: string, surname: string, position: string, about: string): Promise<AdminServiceResponse> {
        const hashPassword = await bcrypt.hash(password, 3);

        const createAdmin = await pool.query(
            `INSERT INTO "admin"(login, password, name, surname, position, about) VALUES($1 , $2 , $3 , $4 , $5, $6 ) RETURNING *`,
            [login, hashPassword, name, surname, position, about]
        );
        if (createAdmin.rows && createAdmin.rows.length > 0) {
            const admin: AdminData = createAdmin.rows[0];
            const token: string = TokenService.generateToken(admin);

            return {admin, token};
        } else {
            throw new Error("Failed to create administrator")
        }
    }

    async get(login: string, password: string) {
        const getAdmin = await pool.query(`SELECT * FROM admin WHERE login = $1`, [login]);

        if (!getAdmin) {
            throw new Error("Admin was not found");
        }

        const validPassword = bcrypt.compareSync(password, getAdmin.rows[0].password);
        if (!validPassword) {
            throw new Error("The password is not correct")
        }

        const admin: AdminData = getAdmin.rows[0];
        const token: string = TokenService.generateToken(admin);


        return {admin, token}
    }

    async update(name: string, surname: string, position: string, about: string):Promise<void> {
        const updateColumnForAdmin = await pool.query(`UPDATE admin SET name = $1,surname = $2, position = $3, about = $4 RETURNING *;`,
            [name, surname, position, about]);
        return updateColumnForAdmin.rows[0];
    }
}

export default new AdminService()
