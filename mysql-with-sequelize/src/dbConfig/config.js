import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('user_crud', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});



export default sequelize;
