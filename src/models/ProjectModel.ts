import Sequelize from "sequelize";

export default function (sequelize: any) {
    return sequelize.define('Project', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        start_date: {
            type: Sequelize.DATE
        },
        end_date: {
            type: Sequelize.DATE
        },
        keywords: {
            type: Sequelize.STRING(100)
        },
        category: {
            type: Sequelize.STRING(100)
        },
        url: {
            type: Sequelize.STRING(200)
        },
        image: {
            type: Sequelize.STRING(100)
        },
        adminName: {
            type: Sequelize.STRING(100)
        },
        description: {
            type: Sequelize.TEXT
        },
    });
}
