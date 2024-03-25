import pool from "../pool/pool";

class ProjectService{
    async create(name: string, descriptio: string, start_data: string, end_date: string, url: string, images: string, keywords: string, category:string){
        const createNewProject = await pool.query(
            `INSERT INTO projects (name, description, start_date, end_date, url, images, keywords, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [name, descriptio, start_data, end_date, url, images, keywords, category]
        );
        return createNewProject.rows[0]
    }
    async getAll(){}
    async getById(){}
    async update(){}
    async delete(){}

}
export default new ProjectService()