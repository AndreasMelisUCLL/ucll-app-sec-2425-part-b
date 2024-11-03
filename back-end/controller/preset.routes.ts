/**
 * @swagger
 *   components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     schemas:
 *       Preset:
 *         type: object
 *         properties:
 *           id:
 *             minimum: 1  # Added minimum for Preset id
 *             type: integer
 *             format: int64
 *           name:
 *             type: string
 *           reskins:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Reskin'
 *           user:
 *             $ref: '#/components/schemas/User'
 *           isCurrent:
 *             type: boolean
 *       PresetInput:
 *         type: object
 *         required:
 *           - name
 *           - reskins
 *           - user
 *           - isCurrent
 *         properties:
 *           id:
 *             minimum: 1  # Added minimum for PresetInput id
 *             type: integer
 *             format: int64
 *           name:
 *             type: string
 *           reskins:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/ReskinInput'
 *           user:
 *             $ref: '#/components/schemas/UserInput'
 *           isCurrent:
 *             type: boolean
 *       Reskin:
 *         type: object
 *         properties:
 *           id:
 *             minimum: 1  # Added minimum for Reskin id
 *             type: integer
 *             format: int64
 *           for:
 *             type: string
 *             enum: [Pawn, Knight, King]
 *           as:
 *             type: string
 *             enum: [black, white] 
 *           theme:
 *             $ref: '#/components/schemas/Theme'
 *       ReskinInput:
 *         type: object
 *         properties:
 *           id:
 *             minimum: 1  # Added minimum for ReskinInput id
 *             type: integer
 *             format: int64
 *           for:
 *             type: string
 *             enum: [Pawn, Knight, King]
 *           as:
 *             type: string
 *             enum: [black, white]
 *           theme:
 *             $ref: '#/components/schemas/Theme'
 *       Theme:
 *         type: object
 *         properties:
 *           id:
 *             minimum: 1  # Added minimum for Theme id
 *             type: integer
 *             format: int64
 *           name:
 *             type: string
 *           description:
 *             type: string
 *       User:
 *         type: object
 *         properties:
 *           id:
 *             minimum: 1  # Added minimum for User id
 *             type: integer
 *             format: int64
 *           username:
 *             type: string
 *           email:
 *             type: string
 *       UserInput:
 *         type: object
 *         properties:
 *           id: 
 *             minimum: 1  # Added minimum for UserInput id
 *             type: integer
 *             format: int64
 *           username:
 *             type: string
 *           email:
 *             type: string
 */

import express, { NextFunction, Request, Response } from 'express';
import presetService from '../service/preset.service';
import { PresetInput } from '../types';

const presetRouter = express.Router();


/**
 * @swagger
 * /preset/{userId}:
 *   get:
 *     summary: Get a list of presets by the user id
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of Preset objects.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Preset'
 */

presetRouter.get('/:userId', (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        
        const presets = presetService.getPresetsByUserId({ userId });

        res.json(presets);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /preset:
 *   post:
 *     summary: Create a new preset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PresetInput'
 *     responses:
 *       200:
 *         description: Preset created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Preset'
 */
// create a new preset
presetRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const preset = <PresetInput> req.body;  
        const newPreset = presetService.createPreset(preset);
        res.status(200).json(newPreset);
    } catch (error) {
        next(error);
    }
});

export { presetRouter };