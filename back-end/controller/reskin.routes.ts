import { PieceType } from '../model/piece';
import express, { Request, Response } from 'express';
import reskinService from '../service/reskin.service';

const reskinRouter = express.Router();

reskinRouter.get('/:pieceType', (req: Request, res: Response) => {
    try {
        const pieceType = req.params.pieceType as PieceType;
        const reskins = reskinService.getReskinsByPieceType({ pieceType });
        
        res.status(200).json(reskins);
    } catch (error) {
        console.error(error);
    }
});

export { reskinRouter };