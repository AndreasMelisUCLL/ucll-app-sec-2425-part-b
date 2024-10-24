import { Color, PieceType } from '../../model/enumTypes';
import { Reskin } from '../../model/reskin';
import { Theme } from '../../model/theme';


test('given: valid values for reskin, when: reskin is created, then: reskin is created', () => {
    // given
    const pieceType = PieceType.KING;
    const color = Color.WHITE;
    const imagePath = 'valid/image/path';
    const theme = new Theme({
        name: 'default',
        description: 'default theme',
    });

    // when
    const reskin = new Reskin({
        for: pieceType,
        as: color,
        imagePath,
        theme,
    });

    // then
    expect(reskin.getPieceType()).toBe(PieceType.BISHOP);
    expect(reskin.getColor()).toBe(Color.WHITE);
    expect(reskin.getImagePath()).toBe('path/to/image');
    expect(reskin.getTheme()).toBe(theme);
});