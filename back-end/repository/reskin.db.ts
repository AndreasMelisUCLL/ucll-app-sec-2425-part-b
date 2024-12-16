import { Piece, PieceType }   from '../model/piece';
import { Reskin }           from '../model/reskin';
import { Theme }            from '../model/theme';

// DUMMY DATA _____________________________________________________________________________________

const sniperTheme = new Theme({
    name: 'sniper bishop',
    description: 'lining up the shots'
});
const reskins = [
    new Reskin({
        piece: new Piece({
            color: 'BLACK',
            type: 'BISHOP',
        }),
        theme: sniperTheme
    }),
    new Reskin({
        piece: new Piece({
            color: 'WHITE',
            type: 'BISHOP',
        }),
        theme: sniperTheme
    }),
];

// METHODS _______________________________________________________________________________________

const getReskinsByPieceType = ({ pieceType }: { pieceType: PieceType }): Reskin[] => {
    try {
        return reskins.filter(reskin => 
            reskin.piece.type === pieceType
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
    getReskinsByPieceType,
    getReskinByPieceAndTheme,
};