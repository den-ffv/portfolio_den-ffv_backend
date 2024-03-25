import {DataTypes, UUIDV4} from "sequelize";
import sequelize from "../pool/pool";
import { v4 as uuidv4 } from 'uuid';

const Admin = sequelize.define('Admin', {
        id: {
            type: UUIDV4,
            unique: true,
            allowNull: false,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        login: {
            type: DataTypes.STRING(45),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        about: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        job_search_status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        timestamps: false,
    });

export default Admin
