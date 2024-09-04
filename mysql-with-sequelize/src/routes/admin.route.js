import { Router } from "express";
import { createUser, deleteUserById, getAllUsers, getHello, getUserByID, updateUserByID } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         age:
 *           type: integer
 *       required:
 *         - name
 *         - email
 */

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Operations related to Admin
 */

/**
 * @swagger
 * /admin/hello:
 *   get:
 *     summary: Get a hello message
 *     tags: [Admin]
 *     responses:
 *       '200':
 *         description: A successful response with a hello message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello, world!
 */

router.route("/admin/hello").get(getHello);

/**
 * @swagger
 * /admin/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Server error
 */

router.route("/admin/create").post(createUser);

/**
 * @swagger
 * /admin/get-all:
 *   get:
 *     summary: Get all Admin
 *     tags: [Admin]
 *     responses:
 *       '200':
 *         description: List of Admin retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.route("/admin/get-all").get(getAllUsers);

/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to retrieve
 *     responses:
 *       '200':
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *   put:
 *     summary: Update a user by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 */

router.route("/admin/:id")
    .get(getUserByID)
    .put(updateUserByID)
    .delete(deleteUserById);




/**
 * @swagger
 * components:
 *   schemas:
 *     Variant:
 *       type: object
 *       required:
 *         - name
 *         - photos
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the variant
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *           description: An array of photo URLs
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - variants
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product
 *         variants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Variant'
 */





export default router;
