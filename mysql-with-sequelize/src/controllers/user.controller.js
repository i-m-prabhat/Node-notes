import { ApiError } from "../helpers/ApiError.js";
import { ApiResponse } from "../helpers/ApiResponse.js";
import { User } from "../models/user.model.js";

const getHello = async (req, res) =>
{
    try
    {
        ApiResponse.success(res, null, 'Namaste Duniya!', 200);
    } catch (error)
    {
        ApiResponse.error(res, error, 'Failed to create user', 400);
    }
};



// Create a new user
const createUser = async (req, res) =>
{
    try
    {
        const user = await User.create(req.body);
        ApiResponse.success(res, user, 'User created successfully', 201);
    } catch (error)
    {
        ApiResponse.error(res, error, 'Failed to create user', 400);
    }
};

// Get all users
const getAllUsers = async (req, res) =>
{
    try
    {
        const users = await User.findAll(); // Sequelize equivalent of find()
        ApiResponse.success(res, users, 'Users fetched successfully');
    } catch (error)
    {
        ApiResponse.error(res, error, 'Failed to fetch users');
    }
};

// Get user by ID
const getUserByID = async (req, res) =>
{
    try
    {
        const user = await User.findByPk(req.params.id); // Sequelize equivalent of findById()
        if (!user)
        {
            throw new ApiError(404, 'User not found');
        }
        ApiResponse.success(res, user, 'User fetched successfully');
    } catch (error)
    {
        ApiResponse.error(res, error, 'Failed to fetch user');
    }
};

// Update user by ID
const updateUserByID = async (req, res) =>
{
    try
    {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id },
            returning: true,
            individualHooks: true // Ensures validation hooks run
        });

        if (!updated)
        {
            throw new ApiError(404, 'User not found');
        }

        const updatedUser = await User.findByPk(req.params.id);
        ApiResponse.success(res, updatedUser, 'User updated successfully');
    } catch (error)
    {
        ApiResponse.error(res, error, 'Failed to update user', 400);
    }
};

// Delete user by ID
const deleteUserById = async (req, res) =>
{
    try
    {
        const user = await User.findByPk(req.params.id);
        if (!user)
        {
            throw new ApiError(404, 'User not found');
        }

        await user.destroy(); // Sequelize equivalent of findByIdAndDelete()
        ApiResponse.success(res, user, 'User deleted successfully');
    } catch (error)
    {
        ApiResponse.error(res, error, 'Failed to delete user');
    }
};


export
{
    getHello,
    createUser,
    getAllUsers,
    getUserByID,
    updateUserByID,
    deleteUserById
}