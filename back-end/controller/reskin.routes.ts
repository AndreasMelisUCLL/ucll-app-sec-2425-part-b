import { Piece } from '../model/piece';
import express, { Request, Response } from 'express';
import reskinService from '../service/reskin.service';

const reskinRouter = express.Router();

reskinRouter.get('/:pieceCode', async (req: Request, res: Response) => {
    try {
        const piece = Piece.fromPieceCode(req.params.pieceCode);
        const reskins = await reskinService.getReskinsByPiece({ piece });
        
        res.status(200).json(reskins);
    } catch (error) {
        console.error(error);
    }
});

export { reskinRouter };