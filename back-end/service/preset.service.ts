import { Preset }       from '../model/preset';

import presetDB         from '../repository/preset.db';

import userService      from './user.service';
import reskinService    from './reskin.service';

import { PresetInput }  from '../types'

// RETRIEVAL _______________________________________________________________________________________

const getPresetsByUserId = ({ userId }: { userId: number }): Preset[] => {
    const user = userService.getUserById({ id: userId });
    if (!user) {
        throw new Error('User not found');
    }
    return presetDB.getPresetsByUser({ user });
}

// CREATION ________________________________________________________________________________________

const createPreset = ({ 
    userId,
    name,
    reskinInputs,
}: PresetInput): Preset => {
    // retrieve user by id
    const user = userService.getUserById({ id: userId });

    // check preset name is unique for user
    if (presetDB.getPresetByUserAndName({ user, name })) {
        throw new Error(`Preset with name "${name}" already exists for this user.`);
    }
    
    // retrieve reskins by piece and theme id
    const reskins = reskinInputs.map(reskinInput =>
        reskinService.getReskinByPieceAndThemeId(reskinInput)
    );

    // exclude domain errors during creation
    const preset = new Preset({
        name,
        reskins,
        user
    });

    return presetDB.save(preset);
}


export default { 
    getPresetsByUserId, 
    createPreset 
};