import { Sequelize } from "sequelize";

const sequelizeConnection = new Sequelize({
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'web_nangcao',
    dialect: "mysql",
})

export default sequelizeConnection;