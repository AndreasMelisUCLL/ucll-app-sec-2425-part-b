import { Reskin }   from '../model/reskin';
import { Theme }    from '../model/theme';

import utils from '../util';

// DUMMY DATA _____________________________________________________________________________________

const sniperTheme = new Theme({
    name: 'sniper bishop',
    description: 'lining up the shots'
});
const reskins = [
    new Reskin({
        piece: utils.pieceOf({
            color: 'BLACK',
            type: 'BISHOP',
        }),
        theme: sniperTheme
    }),
    new Reskin({
        piece: utils.pieceOf({
            color: 'WHITE',
            type: 'BISHOP',
        }),
        theme: sniperTheme
    }),
];

// METHODS _______________________________________________________________________________________

const getReskinsByPiece = ({ piece }: { piece: Piece }): Reskin[] => {
    try {
        return reskins.filter(reskin => 
            reskin.piece === piece
        );
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getReskinByPieceAndTheme = ({ piece, theme }: { piece: Piece, theme: Theme }): Reskin | undefined => {
    try {
        return reskins.find(reskin => 
            reskin.piece === piece &&
            reskin.theme.equals(theme)
        );
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}


export default {
    getReskinsByPiece,
    getReskinByPieceAndTheme,
};