import { Preset }   from "../model/preset";
import { Reskin }   from "../model/reskin";
import { Theme }    from "../model/theme";
import { User }     from "../model/user";

import utils from "../util";

// DUMMY DATA _____________________________________________________________________________________

const user: User = new User({
    id: 1,
    username: 'john_doe',
    password: 'john123'
});

const sniperTheme = new Theme({
    name: 'sniper bishop',
    description: 'lining up the shots'
});

const sniperReskins = [
    new Reskin({
        piece: utils.pieceOf({
            color: 'BLACK',
            type: 'BISHOP',
        }),
        theme: sniperTheme
    }),
    new Reskin({
        piece: utils.pieceOf({
            color: 'WHITE',
            type: 'BISHOP',
        }),
        theme: sniperTheme
    }),
];

const presets: Preset[] = [
    new Preset({
        name: 'default',
        reskins: [],
        user
    }),
    new Preset({
        name: 'american sniper',
        reskins: sniperReskins,
        user
    })
];

// METHODS _______________________________________________________________________________________

const save = (preset: Preset): Preset => {
    presets.push(preset);
    return preset;
}

const getPresetsByUser = ({ user }: { user: User }): Preset[] => {
    return presets.filter(preset => 
        preset.user.equals(user)
    );
}

const getCurrentPresetByUser = ({ user }: { user: User }): Preset | undefined => {
    return presets.find(preset => 
        preset.user.equals(user) && 
        preset.isCurrent
    );
}

const getPresetByUserAndName = ({ user, name }: { user: User, name: string }): Preset[] => {
    return presets.filter(preset => 
        preset.user === user &&
        preset.name === name 
    );
}


export default {
    save, 
    getPresetsByUser,
    getPresetByUserAndName,
    getCurrentPresetByUser,
};