import { PresetInput }  from '../types'

import { Piece }        from '../model/piece';
import { Preset }       from '../model/preset';

import reskinService    from './reskin.service';
import userService      from './user.service';

import presetDB         from '../repository/preset.db';


// RETRIEVAL _______________________________________________________________________________________

const getPresetsByUser = async ({ 
    userId 
}: { 
    userId: number 
}): Promise<Preset[]> => {
    const user = await userService.getUserById({ id: userId });
    if (!user) {
        throw new Error('User not found');
    }
    return await presetDB.getPresetsByUser({ userId });
}

const getActivePresetByUser = async ({ 
    userId 
}: { 
    userId: number 
}): Promise<Preset> => {
    const user = await userService.getUserById({ id: userId });
    if (!user) {
        throw new Error('User not found');
    }
    const preset = await presetDB.getActivePresetByUser({ userId })
    if (preset){return preset}
    else{throw new Error("No Preset Found")}

    
}

// CREATION ________________________________________________________________________________________

const createPreset = async ({ 
    userId,
    name,
    reskinInputs,
}: PresetInput): Promise<Preset> => {
    // retrieve user by id
    const user = await userService.getUserById({ id: userId });

    // check preset name is unique for user
    if (await presetDB.getPresetByUserAndName({ userId, name })) {
        throw new Error(`Preset with name "${name}" already exists for this user.`);
    }
    
    // retrieve reskins by piece and theme id
    const reskins = await Promise.all(reskinInputs.map(reskinInput => {
        const piece = new Piece(reskinInput.pieceInput);
        return reskinService.getReskinByPieceAndTheme({ 
            piece, 
            themeId: reskinInput.themeId
        });
    }));

    // exclude domain errors during creation
    const preset = new Preset({
        name,
        reskins,
        user
    });

    return await presetDB.save(preset);
}


export default { 
    getPresetsByUser, 
    createPreset,
    getActivePresetByUser
};