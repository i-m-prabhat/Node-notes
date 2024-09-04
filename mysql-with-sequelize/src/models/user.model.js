import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../dbConfig/index.js';  // Assuming you have a sequelize instance in this path

class User extends Model { }

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Name is required"
            },
            notEmpty: {
                msg: "Name cannot be empty"
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "Email must be unique"
        },
        validate: {
            notNull: {
                msg: "Email is required"
            },
            notEmpty: {
                msg: "Email cannot be empty"
            },
            isEmail: {
                msg: "Email must be a valid email address"
            },
        },
        set(value)
        {
            this.setDataValue('email', value.trim().toLowerCase());
        }
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: {
                args: [0],
                msg: 'Age must be a positive number'
            }
        },
    },
}, {
    sequelize, // passing the sequelize instance
    modelName: 'User',
    tableName: 'users', // optional, you can specify the table name or let Sequelize infer it
    timestamps: false, // assuming no createdAt or updatedAt fields are needed
});

export { User };
