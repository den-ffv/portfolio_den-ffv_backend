import { Sequelize, Options } from "sequelize";

interface DatabaseConfig {
    database: string;
    username: string;
    password: string;
    host: string;
    port: number;
    dialect: string;
}
const dbConfig: DatabaseConfig = {
    database: process.env.DB_DATABASE || '',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: process.env.DB_DIALECT || 'postgres'
};
const sequelize = new Sequelize(dbConfig as Options);

export default sequelize
