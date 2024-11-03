import { Preset } from '../model/preset';
import presetDB from '../repository/preset.db';
import { PresetInput } from '../types';
import userService from './user.service';
import reskinDb from '../repository/reskin.db';


const getPresetsByUserId = ({ userId }: { userId: number }): Preset[] => {
    const user = userService.getUserById({ id: userId });
    if (!user) {
        throw new Error('User not found');
    }
    return presetDB.getPresetsByUser({ user });
}

const createPreset = ({ 
    name,
    reskins: reskinInputs,
    user: userInput,
    isCurrent
}: PresetInput): Preset => {
    if (!userInput.id) {
        throw new Error('User id is required');
    }
    const user = userService.getUserById({ id: userInput.id });
    if (!user) {
        throw new Error('User not found');
    }
    
    const reskins = new Array();
    for (const reskin of reskinInputs) {
        if (!reskin.id) {
            throw new Error('Reskin ids are required');
        }
        reskins.push(reskinDb.getReskinById({ id: reskin.id }));
    }
    if (reskins.some(reskin => !reskin)) {
        throw new Error('Reskin not found');
    }

    // check for existing preset
    const existingPreset = presetDB.getPresetByNameAndUser({ name, user });
    if (existingPreset) {
        throw new Error(`Preset with name "${name}" already exists for this user.`);
    }       

    const preset = new Preset({
        name,
        reskins,
        user,
        isCurrent
    });

    return presetDB.createPreset(preset);
}

export default { 
    getPresetsByUserId, 
    createPreset 
};