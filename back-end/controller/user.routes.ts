/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *     AuthenticationRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user   
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a user by their id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
// get user by id
userRouter.get('/:id', async (req: Request & {auth: any}, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userService.getUserById({ id });

        res.json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /user:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: get the userinfo of a user or if the user is an admin a list of all users
 *     responses:
 *       200:
 *         description: A user object or Array.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request & {auth: any}, res: Response, next: NextFunction) => {
    try {
        const {username, role} = req.auth;
        const users = await userService.getUserByUsername({ username, role });

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.createUser(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: log in using username and password
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AuthenticationRequest'
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({message: "Authentication success", ...response})
    } catch (error) {
        next(error)
    }
});

export { userRouter };