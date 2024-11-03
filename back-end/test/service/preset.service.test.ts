import { User } from '../../model/user';
import presetDB from '../../repository/preset.db';
import presetService from '../../service/preset.service';
import userService from '../../service/user.service';
import reskinDb from '../../repository/reskin.db';
import { Color, PieceType } from '../../types';


let mockUserServiceGetUserById: jest.Mock;
let mockPresetDbCreatePreset: jest.Mock;
let mockPresetDbGetPresetsByUser: jest.Mock;
let mockPresetDbGetPresetByNameAndUser: jest.Mock;
let mockReskinDbGetReskinById: jest.Mock;


beforeEach(() => {
    mockUserServiceGetUserById = jest.fn();
    mockPresetDbCreatePreset = jest.fn();
    mockPresetDbGetPresetsByUser = jest.fn();
    mockPresetDbGetPresetByNameAndUser = jest.fn();
    mockReskinDbGetReskinById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});


test('given: valid user id, when: invoking getPresetByUserId, then: the users presets are returned', () => {
    // given
    const userId = 1;
    const johnDoe = new User({ id: userId, username: 'john_doe', password: 'john123' });
    const johnDoePreset = { 
        name: 'johns_preset', 
        reskins: [], 
        user: johnDoe, 
        isCurrent: true
    };

    userService.getUserById = mockUserServiceGetUserById.mockReturnValue(johnDoe);
    presetDB.getPresetsByUser = mockPresetDbGetPresetsByUser.mockReturnValue(johnDoePreset);

    // when
    const foundPresets = presetService.getPresetsByUserId({ userId });

    // then
    expect(mockUserServiceGetUserById).toHaveBeenCalledWith({ id: userId });
    expect(mockPresetDbGetPresetsByUser).toHaveBeenCalledWith({ user: johnDoe });
    expect(foundPresets).toEqual(johnDoePreset);
});

test('given: invalid user id, when: invoking getPresetByUserId, then: an error is thrown', () => {
    // given
    const userId = 0;

    userService.getUserById = mockUserServiceGetUserById.mockReturnValue(null);

    // when, then
    expect(() => {
        presetService.getPresetsByUserId({ userId });
    }).toThrow('User not found');
});

test('given: valid preset input, when: invoking createPreset, then: the preset is created', () => {
    // given
    const userId = 1;
    const johnDoe = { id: userId, username: 'john_doe', password: 'john123' };
    const presetInput = { 
        name: 'johns_preset', 
        reskins: [], 
        user: johnDoe, 
        isCurrent: true
    };

    userService.getUserById = mockUserServiceGetUserById.mockReturnValue(johnDoe);
    presetDB.getPresetByNameAndUser = mockPresetDbGetPresetByNameAndUser.mockReturnValue(null);
    presetDB.createPreset = mockPresetDbCreatePreset.mockReturnValue(presetInput);

    // when
    const createdPreset = presetService.createPreset(presetInput);

    // then
    expect(presetDB.createPreset).toHaveBeenCalledWith(presetInput);
    expect(createdPreset).toEqual(presetInput);
});

test('given: invalid user id, when: invoking createPreset, then: an error is thrown', () => {
    // given
    const userId = 999;
    const presetInput = { 
        name: 'johns_preset', 
        reskins: [], 
        user: { id: userId, username: 'john_doe', password: 'john123' }, 
        isCurrent: true
    };

    userService.getUserById = mockUserServiceGetUserById.mockReturnValue(null);

    // when, then
    expect(() => {
        presetService.createPreset(presetInput);
    }).toThrow('User not found');
});

test('given: existing preset name, when: invoking createPreset, then: an error is thrown', () => {
    // given
    const userId = 1;
    const johnDoe = { id: userId, username: 'john_doe', password: 'john123' };
    const presetInput = { 
        name: 'johns_preset', 
        reskins: [], 
        user: johnDoe, 
        isCurrent: true
    };

    userService.getUserById = mockUserServiceGetUserById.mockReturnValue(johnDoe);
    presetDB.getPresetByNameAndUser = mockPresetDbGetPresetByNameAndUser.mockReturnValue(presetInput);

    // when, then
    expect(() => {
        presetService.createPreset(presetInput);
    }).toThrow(`Preset with name "${presetInput.name}" already exists for this user.`);
});

test('given: invalid reskin id, when: invoking createPreset, then: an error is thrown', () => {
    // given
    const userId = 1;
    const johnDoe = { id: userId, username: 'john_doe', password: 'john123' };
    const presetInput = { 
        name: 'johns_preset', 
        reskins: [{ 
            id: 1,
            for: { type: PieceType.KING, color: Color.WHITE },
            theme: { name: 'minion', description: 'its the minions!' }
        }], 
        user: johnDoe, 
        isCurrent: true
    };

    userService.getUserById = mockUserServiceGetUserById.mockReturnValue(johnDoe);
    presetDB.getPresetByNameAndUser = mockPresetDbGetPresetByNameAndUser.mockReturnValue(null);
    reskinDb.getReskinById = mockReskinDbGetReskinById.mockReturnValue(null);

    // when, then
    expect(() => {
        presetService.createPreset(presetInput);
    }).toThrow('Reskin not found');
});