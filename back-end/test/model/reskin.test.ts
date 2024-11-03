import { Color, PieceType } from '../../types';
import { Reskin } from '../../model/reskin';
import { Theme } from '../../model/theme';


test('given: valid values for reskin, when: reskin is created, then: reskin is created', () => {
    // given
    const piece = {
        type: PieceType.KING,
        color: Color.WHITE
    };
    const theme = new Theme({
        name: 'default',
        description: 'default theme',
    });

    // when
    const reskin = new Reskin({
        for: piece,
        theme,
    });

    // then
    expect(reskin.getPiece().type).toBe(PieceType.KING);
    expect(reskin.getPiece().color).toBe(Color.WHITE);
    expect(reskin.getTheme()).toBe(theme);
});