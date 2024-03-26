import {DataTypes, UUIDV4} from "sequelize";
import sequelize from "../pool/pool";
import Admin from "./AdminModel";

const Contact = sequelize.define('Contact', {
        id: {
            type: UUIDV4,
            unique: true,
            allowNull: false,
            primaryKey: true,
            defaultValue: UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false,
    })

export default Contact