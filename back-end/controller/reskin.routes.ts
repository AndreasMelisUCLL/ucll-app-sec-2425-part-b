import express, { NextFunction, Request, Response } from 'express';
import reskinService from '../service/reskin.service';

const reskinRouter = express.Router();

reskinRouter.get('/:piece', (req: Request, res: Response) => {
    try {
        const piece = req.params.piece as Piece;
        const reskins = reskinService.getReskinsByPiece({ piece });
        res.status(200).json(reskins);
    } catch (error) {
        console.error(error);
    }
});

export { reskinRouter };