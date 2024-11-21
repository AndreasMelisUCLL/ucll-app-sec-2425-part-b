const colorMap: Record<ColorString, Color> = {
    "WHITE": 'w',
    "BLACK": 'b',
};
const colorStringMap: Record<Color, ColorString> = {
    'w': "WHITE",
    'b': "BLACK",
};
const pieceTypeStringMap: Record<PieceType, PieceTypeString> = {
    'P': "PAWN",
    'N': "KNIGHT",
    'B': "BISHOP",
    'R': "ROOK",
    'Q': "QUEEN",
    'K': "KING",
};
const pieceTypeMap: Record<PieceTypeString, PieceType> = {
    "PAWN": 'P',
    "KNIGHT": 'N',
    "BISHOP": 'B',
    "ROOK": 'R',
    "QUEEN": 'Q',
    "KING": 'K',
};

export {
    colorMap,
    colorStringMap,
    pieceTypeMap,
    pieceTypeStringMap,
}