import pkg from "pg";
const Pool = pkg.Pool;

interface DbConfig{
    user: string,
    password:string,
    host:string,
    port: number,
    database:string
}


const poolConfig: DbConfig ={
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || '',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_DATABASE || '',
}

const pool = new Pool(poolConfig);

export default pool