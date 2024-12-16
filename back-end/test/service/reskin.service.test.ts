import { Piece }      from "../../model/piece";
import { Reskin }       from "../../model/reskin";
import { Theme }        from "../../model/theme";

import reskinService    from "../../service/reskin.service";

import reskinDb         from "../../repository/reskin.db";

// EXPECTED VALUES _______________________________________________________________________________

const valid = {
    id: 1,
    piece: new Piece({
        color: 'WHITE',
        type: 'KING',
    }),
    theme: new Theme({
            id: 1,
            name: 'default',
            description: 'default theme',
        }),
}

// MOCK SETUP ____________________________________________________________________________________

let mockReskinDbGetReskinsByPieceType: jest.Mock;
let mockReskinDbGetReskinByPieceAndTheme: jest.Mock;

beforeEach(() => {
    mockReskinDbGetReskinsByPieceType = jest.fn();
    mockReskinDbGetReskinByPieceAndTheme = jest.fn();
});
afterEach(() => {
    jest.clearAllMocks();
});

// GET RESKINS BY PIECETYPE __________________________________________________________________________

test('given: valid piece, when: invoking getReskinsByPiece, then: reskins are returned', () => {
    // GIVEN ------------------------------------
    const pieceType = valid.piece.type;

    // MOCK -------------------------------------
    reskinDb.getReskinsByPieceType = mockReskinDbGetReskinsByPieceType.mockReturnValue([new Reskin(valid)]);

    // WHEN -------------------------------------
    const reskins = reskinService.getReskinsByPieceType({ pieceType });

    // THEN -------------------------------------
    expect(reskins).toEqual([new Reskin(valid)]);
    
});

// GET RESKIN BY PIECE AND THEME ID ______________________________________________________________

test('given: valid piece and theme id, when: invoking getReskinByPieceAndThemeId, then: reskin is returned', () => {
    // GIVEN ------------------------------------
    const piece = valid.piece;
    const theme = valid.theme;

    // MOCK -------------------------------------
    reskinDb.getReskinByPieceAndTheme = mockReskinDbGetReskinByPieceAndTheme.mockReturnValue(new Reskin(valid));

    // WHEN -------------------------------------
    const reskin = reskinService.getReskinByPieceAndTheme({ piece, theme });

    // THEN -------------------------------------
    expect(reskin).toEqual(new Reskin(valid));

});

test('given: id of a theme without reskin for piece, when: invoking getReskinByPieceAndThemeId, then: error is thrown', () => {
    // GIVEN ------------------------------------
    const themeWithoutReskin = valid.theme;

    const theme = themeWithoutReskin;
    const piece = valid.piece;

    // MOCK -------------------------------------
    reskinDb.getReskinByPieceAndTheme = mockReskinDbGetReskinByPieceAndTheme.mockReturnValue(null);

    // WHEN -------------------------------------
    expect(() => {
        reskinService.getReskinByPieceAndTheme({ piece, theme });

    // THEN -------------------------------------
    }).toThrow(`Theme ${themeWithoutReskin.name} does not have a reskin for ${piece}`);

});