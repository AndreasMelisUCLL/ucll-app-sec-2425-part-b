import { Piece, PieceString } from '../model/piece';
import express, { Request, Response } from 'express';
import reskinService from '../service/reskin.service';

const reskinRouter = express.Router();

reskinRouter.get('/:piece', async (req: Request, res: Response) => {
    try {
        const pieceString = req.params.piece as PieceString;
        const piece = Piece.from(pieceString);

        const reskins = await reskinService.getReskinsByPiece({ piece });
        
        res.status(200).json(reskins);
    } catch (error) {
        console.error(error);
    }
});

export { reskinRouter };