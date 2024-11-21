import { Preset }       from '../../model/preset';
import { Reskin }       from '../../model/reskin';
import { Theme }        from '../../model/theme';
import { User }         from '../../model/user';

import presetService    from '../../service/preset.service';
import userService      from '../../service/user.service';
import reskinService    from '../../service/reskin.service';

import presetDB         from '../../repository/preset.db';

import utils            from '../../util';

// MOCK SETUP ____________________________________________________________________________________

let mockUserServiceGetUserById: jest.Mock;
let mockPresetDbSave: jest.Mock;
let mockPresetDbGetPresetsByUser: jest.Mock;
let mockPresetDbGetPresetByUserAndName: jest.Mock;
let mockReskinServiceGetReskinByPieceAndThemeId: jest.Mock;

beforeEach(() => {
    mockUserServiceGetUserById = jest.fn();
    mockPresetDbSave = jest.fn();
    mockPresetDbGetPresetsByUser = jest.fn();
    mockPresetDbGetPresetByUserAndName = jest.fn();
    mockReskinServiceGetReskinByPieceAndThemeId = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

// EXPECTED VALUES _______________________________________________________________________________

const valid = {
    name: 'preset1',
    user: new User({ 
            id: 1,
            username: 'john_doe', 
            password: 'john123'
        }),
    reskins: [
        new Reskin({ 
            id: 1,
            piece: utils.pieceOf({
                color: 'WHITE',
                type: 'KING',
            }),
            theme: new Theme({
                id: 1,
                name: 'default',
                description: 'default theme',
            }),
        })
    ]
};


// GET PRESETS BY USER ID ________________________________________________________________________

test('given: valid user id, when: invoking getPresetByUserId, then: the users presets are returned', () => {
    // GIVEN ------------------------------------
    const userId = valid.user.id!;

    // MOCK -------------------------------------
    userService.getUserById = mockUserServiceGetUserById.mockReturnValue(valid.user);
    presetDB.getPresetsByUser = mockPresetDbGetPresetsByUser.mockReturnValue([new Preset(valid)]);

    // WHEN -------------------------------------
    const foundPresets = presetService.getPresetsByUserId({ userId });

    // THEN -------------------------------------
    expect(mockUserServiceGetUserById).toHaveBeenCalledWith({ id: userId });
    expect(mockPresetDbGetPresetsByUser).toHaveBeenCalledWith({ user: valid.user });
    expect(foundPresets).toEqual([new Preset(valid)]);

});

test('given: invalid user id, when: invoking getPresetByUserId, then: an error is thrown', () => {
    // GIVEN ------------------------------------
    const userId = 0;
    
    // MOCK -------------------------------------
    userService.getUserById = mockUserServiceGetUserById.mockReturnValue(null);
    
    // WHEN -------------------------------------
    expect(() => {
        presetService.getPresetsByUserId({ userId });
    
    // THEN -------------------------------------
    }).toThrow('User not found');

});


// CREATE PRESET _________________________________________________________________________________

test('given: valid preset input, when: invoking createPreset, then: the preset is created', () => {
    // GIVEN ------------------------------------
    const userId = valid.user.id!;
    const name = valid.name;
    const reskinInputs = valid.reskins.map(Reskin.toInput);

    // MOCK -------------------------------------
    userService.getUserById = mockUserServiceGetUserById.mockReturnValue(valid.user);
    presetDB.getPresetByUserAndName = mockPresetDbGetPresetByUserAndName.mockReturnValue(null);
    presetDB.save = mockPresetDbSave.mockReturnValue(new Preset(valid));
    reskinService.getReskinByPieceAndThemeId = mockReskinServiceGetReskinByPieceAndThemeId.mockReturnValue(valid.reskins[0]);

    // WHEN -------------------------------------
    const createdPreset = presetService.createPreset({ userId, name, reskinInputs });

    // THEN -------------------------------------
    expect(createdPreset).toEqual(new Preset(valid));
    expect(createdPreset.reskins).toEqual(valid.reskins);
    expect(presetDB.save).toHaveBeenCalledWith(new Preset(valid));
    expect(mockReskinServiceGetReskinByPieceAndThemeId).toHaveBeenCalled();

});

test('given: userId and name matching existing preset, when: invoking createPreset, then: an error is thrown', () => {
    // GIVEN ------------------------------------
    const existingPreset = new Preset(valid);

    const userId = existingPreset.user.id!;
    const name = existingPreset.name; 
    const reskinInputs = valid.reskins.map(Reskin.toInput);

    // MOCK -------------------------------------
    userService.getUserById = mockUserServiceGetUserById.mockReturnValue(valid.user);
    presetDB.getPresetByUserAndName = mockPresetDbGetPresetByUserAndName.mockReturnValue(existingPreset);

    // WHEN -------------------------------------
    expect(() => {
        presetService.createPreset({ userId, name, reskinInputs });

    // THEN -------------------------------------
    }).toThrow(`Preset with name "${name}" already exists for this user.`);

});