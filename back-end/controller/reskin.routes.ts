import { Piece, PieceString } from '../model/piece';
import express, { Request, Response } from 'express';
import reskinService from '../service/reskin.service';

const reskinRouter = express.Router();

reskinRouter.get('/:color/:type', async (req: Request & {auth: any}, res: Response) => {
    try {
        const color = req.params.color;
        const type = req.params.type;
        
        const pieceString = `${color.toUpperCase()} ${type.toUpperCase()}` as PieceString;
        const piece = Piece.from(pieceString);

        const reskins = await reskinService.getReskinsByPiece({ piece });
        
        res.status(200).json(reskins);
    } catch (error) {
        console.error(error);
    }
});

export { reskinRouter };