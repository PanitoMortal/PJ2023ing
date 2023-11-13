import { Sequelize } from "sequelize";

const sequelize = new Sequelize('pj2023', 'root', '', {
    host:'localhost',
    port: 3306,
    dialect: 'mysql'
})

export default sequelize;