import { Piece }        from '../../model/piece';
import { Preset }       from '../../model/preset';
import { Reskin }       from '../../model/reskin';
import { Theme }        from '../../model/theme';
import { User }         from '../../model/user';

import presetService    from '../../service/preset.service';
import userService      from '../../service/user.service';
import reskinService    from '../../service/reskin.service';

import presetDB         from '../../repository/preset.db';

// MOCK SETUP ____________________________________________________________________________________

let mockUserServiceGetUserById: jest.Mock;
let mockPresetDbSave: jest.Mock;
let mockPresetDbGetPresetsByUser: jest.Mock;
let mockPresetDbGetPresetByUserAndName: jest.Mock;
let mockReskinServiceGetReskinByPieceAndTheme: jest.Mock;

beforeEach(() => {
    mockUserServiceGetUserById = jest.fn();
    mockPresetDbSave = jest.fn();
    mockPresetDbGetPresetsByUser = jest.fn();
    mockPresetDbGetPresetByUserAndName = jest.fn();
    mockReskinServiceGetReskinByPieceAndTheme = jest.fn();
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
            password: 'john123',
            role: 'user',
        }),
    reskins: [
        new Reskin({ 
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
        })
    ],
    reskinInputs: [
        {
            pieceInput: {
                color: 'WHITE',
                type: 'KING',
            },
            themeId: 1,
        }
    ]
};


// GET PRESETS BY USER ID ________________________________________________________________________

test('given: valid user id, when: invoking getPresetByUserId, then: the users presets are returned', async () => {
    // GIVEN ------------------------------------
    const userId = valid.user.id!;

    // MOCK -------------------------------------
    userService.getUserById = mockUserServiceGetUserById.mockReturnValue(valid.user);
    presetDB.getPresetsByUser = mockPresetDbGetPresetsByUser.mockReturnValue([new Preset(valid)]);

    // WHEN -------------------------------------
    const foundPresets = await presetService.getPresetsByUser({ userId });

    // THEN -------------------------------------
    expect(mockUserServiceGetUserById).toHaveBeenCalledWith({ id: userId });
    expect(mockPresetDbGetPresetsByUser).toHaveBeenCalledWith({ userId });
    expect(foundPresets).toEqual([new Preset(valid)]);

});

test('given: invalid user id, when: invoking getPresetByUserId, then: an error is thrown', () => {
    // GIVEN ------------------------------------
    const userId = 0;
    
    // MOCK -------------------------------------
    userService.getUserById = mockUserServiceGetUserById.mockReturnValue(null);
    
    // WHEN -------------------------------------
    const getPresetsByUser = async () => await
        presetService.getPresetsByUser({ userId });
    
    // THEN -------------------------------------
    expect(getPresetsByUser).rejects.toThrow('User not found');

});


// CREATE PRESET _________________________________________________________________________________

test('given: valid preset input, when: invoking createPreset, then: the preset is created', async () => {
    // GIVEN ------------------------------------
    const userId = valid.user.id!;
    const name = valid.name;
    const reskinInputs = valid.reskinInputs;

    // MOCK -------------------------------------
    userService.getUserById = mockUserServiceGetUserById.mockReturnValue(valid.user);
    presetDB.getPresetByUserAndName = mockPresetDbGetPresetByUserAndName.mockReturnValue(null);
    presetDB.save = mockPresetDbSave.mockReturnValue(new Preset(valid));
    reskinService.getReskinByPieceAndTheme = mockReskinServiceGetReskinByPieceAndTheme.mockReturnValue(valid.reskins[0]);

    // WHEN -------------------------------------
    const createdPreset = await presetService.createPreset({ userId, name, reskinInputs });

    // THEN -------------------------------------
    expect(createdPreset).toEqual(new Preset(valid));
    expect(createdPreset.reskins).toEqual(valid.reskins);
    expect(presetDB.save).toHaveBeenCalledWith(new Preset(valid));
    expect(mockReskinServiceGetReskinByPieceAndTheme).toHaveBeenCalled();

});

test('given: userId and name matching existing preset, when: invoking createPreset, then: an error is thrown', () => {
    // GIVEN ------------------------------------
    const existingPreset = new Preset(valid);

    const userId = existingPreset.user.id!;
    const name = existingPreset.name; 
    const reskinInputs = valid.reskinInputs;

    // MOCK -------------------------------------
    userService.getUserById = mockUserServiceGetUserById.mockReturnValue(valid.user);
    presetDB.getPresetByUserAndName = mockPresetDbGetPresetByUserAndName.mockReturnValue(existingPreset);

    // WHEN -------------------------------------
    const createPreset = async () =>
        await presetService.createPreset({ userId, name, reskinInputs });

    // THEN -------------------------------------
    expect(createPreset).rejects.toThrow(
        `Preset with name "${name}" already exists for this user.`
    );

});