import { Preset } from "../../model/preset";
import { Reskin } from "../../model/reskin";
import { User } from "../../model/user";


test('given: valid values for preset, when: preset is created, then: preset is created', () => {
    // given
    const name = 'preset1';
    const reskins: Reskin [] = [];
    const user = new User({ username: 'johnDoe', password: 'john123' });
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