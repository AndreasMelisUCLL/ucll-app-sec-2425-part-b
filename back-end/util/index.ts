import { 
    colorMap,
    colorStringMap,
    pieceTypeMap,
    pieceTypeStringMap,
} from "./constants";

import {
    Color,
    ColorString,
    Piece,
    PieceType,
    PieceTypeString
} from '../types';

const pieceToString = (piece: Piece): string => {
    const colorString = colorStringMap[piece[0] as Color];
    const typeString = pieceTypeStringMap[piece[1] as PieceType];

    return `${colorString} ${typeString}`.toLowerCase();
};

const pieceOf = ({
    color: colorString, 
    type: typeString
}: {
    color: ColorString,
    type: PieceTypeString
}): Piece => {
    const color = colorMap[colorString];
    const type = pieceTypeMap[typeString];

    return `${color}${type}` as Piece;
};

export default {
    pieceToString,
    pieceOf,
}