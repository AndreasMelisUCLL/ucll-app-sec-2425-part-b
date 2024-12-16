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

test('given: valid piece, when: invoking getReskinsByPiece, then: reskins are returned', async () => {
    // GIVEN ------------------------------------
    const piece = valid.piece;

    // MOCK -------------------------------------
    reskinDb.getReskinsByPiece = mockReskinDbGetReskinsByPieceType.mockReturnValue([new Reskin(valid)]);

    // WHEN -------------------------------------
    const reskins = await reskinService.getReskinsByPiece({ piece });

    // THEN -------------------------------------
    expect(reskins).toEqual([new Reskin(valid)]);
    
});

// GET RESKIN BY PIECE AND THEME ID ______________________________________________________________

test('given: valid piece and theme id, when: invoking getReskinByPieceAndThemeId, then: reskin is returned', async () => {
    // GIVEN ------------------------------------
    const piece = valid.piece;
    const themeId = valid.theme.id!;

    // MOCK -------------------------------------
    reskinDb.getReskinByPieceAndTheme = mockReskinDbGetReskinByPieceAndTheme.mockReturnValue(new Reskin(valid));

    // WHEN -------------------------------------
    const reskin = await reskinService.getReskinByPieceAndTheme({ piece, themeId });

    // THEN -------------------------------------
    expect(reskin).toEqual(new Reskin(valid));

});

test('given: id of a theme without reskin for piece, when: invoking getReskinByPieceAndThemeId, then: error is thrown', () => {
    // GIVEN ------------------------------------
    const themeWithoutReskin = valid.theme;

    const themeId = themeWithoutReskin.id!;
    const piece = valid.piece;

    // MOCK -------------------------------------
    reskinDb.getReskinByPieceAndTheme = mockReskinDbGetReskinByPieceAndTheme.mockReturnValue(null);

    // WHEN -------------------------------------
    const getReskinByPieceAndTheme = async () =>
        await reskinService.getReskinByPieceAndTheme({ piece, themeId });

    // THEN -------------------------------------
    expect(getReskinByPieceAndTheme).rejects.toThrow(`Reskin not found`);

});