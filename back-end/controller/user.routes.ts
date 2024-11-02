/**
 * @swagger
 *   components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
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
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

// get user by id
userRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const user = userService.getUserById({ id });

        res.json(user);
    } catch (error) {
        next(error);
    }
});

export { userRouter };