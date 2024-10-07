import { Sequelize } from 'sequelize'; 
import dotenv from 'dotenv';
import db from './databases'

dotenv.config();

export const sequelize = new Sequelize(
    db.db,
    db.user,
    db.password,
    {
        dialect: 'mysql',
        port: parseInt(db.port)
    }
);