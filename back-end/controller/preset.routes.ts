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
 *             type: integer
 *             format: int64
 *           name:
 *             type: string
 *             description: The name of the preset
 *           reskins:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Reskin'
 *           user:
 *             $ref: '#/components/schemas/User'
 *           isCurrent:
 *             type: boolean
 */
import express, { NextFunction, Request, Response } from 'express';
import presetService from '../service/preset.service';
import { PresetInput } from '../types';

const presetRouter = express.Router();

// get presets by user id
presetRouter.get('/:userId', (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        
        const presets = presetService.getPresetsByUserId({ userId });

        res.json(presets);
    } catch (error) {
        next(error);
    }
});

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