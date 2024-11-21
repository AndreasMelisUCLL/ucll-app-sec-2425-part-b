import { Reskin }   from '../../model/reskin';
import { Theme }    from '../../model/theme';

import utils from '../../util';

// EXPECTED VALUES _______________________________________________________________________________

const valid = {
    piece: utils.pieceOf({
        color: 'WHITE',
        type: 'KING',
    }),
    theme: new Theme({
            name: 'default',
            description: 'default theme',
        }),
}

// CREATE SKIN ___________________________________________________________________________________

test('given: valid values for reskin, when: reskin is created, then: reskin is created', () => {
    // GIVEN ------------------------------------
    const piece = valid.piece;
    const theme = valid.theme;

    // WHEN -------------------------------------
    const reskin = new Reskin({
        piece,
        theme,
    });

    // THEN -------------------------------------
    expect(reskin.piece).toBe(piece);
    expect(reskin.theme).toBe(theme);

});