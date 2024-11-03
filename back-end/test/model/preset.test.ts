import { Color, PieceType } from "../../types";
import { Preset } from "../../model/preset";
import { Reskin } from "../../model/reskin";
import { Theme } from "../../model/theme";
import { User } from "../../model/user";


test('given: valid values for preset, when: preset is created, then: preset is created', () => {
    // given
    const name = 'preset1';
    const reskins: Reskin[] = [

    ];
    const user = new User({ username: 'john_doe', password: 'john123' });
    const isCurrent = true;

    // when
    const preset = new Preset({
        name, 
        reskins, 
        user, 
        isCurrent
    });

    // then
    expect(preset.getName()).toBe(name);
    expect(preset.getReskins()).toBe(reskins);
    expect(preset.getUser()).toBe(user);
    expect(preset.getIsCurrent()).toBe(isCurrent);
});

test('given: blank name, when: preset is created, then: error is thrown', () => {
    // given
    const name = ' ';
    const reskins: Reskin [] = [];
    const user = new User({ username: 'john_doe', password: 'john123' });
    const isCurrent = true;

    // when, then
    expect(() => {
        new Preset({
            name, 
            reskins, 
            user, 
            isCurrent
        })
    }).toThrow('Name cannot be blank');
});

test('given: multiple reskins for the same piece type and color, when: preset is created, then: error is thrown', () => {
    // given
    const name = 'preset1';
    const user = new User({ username: 'john_doe', password: 'john123' });
    const isCurrent = true;

    const theme = new Theme({name: 'default', description: 'default theme'});
    const duplicatePiece = {
        type: PieceType.KING,
        color: Color.WHITE
    };
    const reskins: Reskin[] = [
        new Reskin({
            for: duplicatePiece,
            theme
        }),
        new Reskin({
            for: duplicatePiece,
            theme
        }),
    ];

    // when, then
    expect(() => {
        new Preset({
            name, 
            reskins, 
            user, 
            isCurrent
        })
    }).toThrow("Cannot have multiple reskins for the same piece");
});