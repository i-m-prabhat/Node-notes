import { Sequelize } from 'sequelize';
import sequelize from "./config.js"
import { User } from '../models/user.model.js';



const connectDB = async () =>
{
    try
    {
        await sequelize.authenticate();
        console.log(`\nDatabase Connection Successful!\nDB HOST: ${sequelize.config.host}\nDB NAME: ${sequelize.config.database}\n`);

        // Sync all models
        await sequelize.sync({ alter: true });  // or { force: true } to drop and recreate tables

        console.log("All models were synchronized successfully.");
    } catch (error)
    {
        console.log("Database Connection Failed!", error);
        process.exit(1);
    }
};

export { sequelize, connectDB };
