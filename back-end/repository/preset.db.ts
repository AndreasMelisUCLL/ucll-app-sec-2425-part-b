import { Preset } from "../model/preset";
import { Reskin } from "../model/reskin";
import { Theme } from "../model/theme";
import { User } from "../model/user";
import { PieceType, Color } from "../types";


const user: User = new User({
    id: 1,
    username: 'john_doe',
    password: 'john123'
});

const defaultTheme = new Theme({
    name: 'default',
    description: 'the classic pieces'
});
const minionTheme = new Theme({
    name: 'minion queen',
    description: 'your most valuable piece got even more valuable'
});

const reskins: Reskin[] = [
    new Reskin({
        for: {
            type: PieceType.KING,
            color: Color.WHITE
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.KING,
            color: Color.BLACK
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.QUEEN,
            color: Color.WHITE
        },
        theme: minionTheme
    }),
    new Reskin({
        for: {
            type: PieceType.QUEEN,
            color: Color.BLACK
        },
        theme: minionTheme
    }),
    new Reskin({
        for: {
            type: PieceType.ROOK,
            color: Color.WHITE
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.ROOK,
            color: Color.BLACK
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.BISHOP,
            color: Color.WHITE
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.BISHOP,
            color: Color.BLACK
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.KNIGHT,
            color: Color.WHITE
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.KNIGHT,
            color: Color.BLACK
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.PAWN,
            color: Color.WHITE
        },
        theme: defaultTheme
    }),
    new Reskin({
        for: {
            type: PieceType.PAWN,
            color: Color.BLACK
        },
        theme: defaultTheme
    }),
];

const presets: Preset[] = [
    new Preset({
        name: 'default',
        reskins,
        user,
        isCurrent: true
    }),
    new Preset({
        name: 'minion queen',
        reskins,
        user,
        isCurrent: false
    })
];

const getPresetsByUser = ({ user }: { user: User }): Preset[] => {
    try {
        return presets.filter(preset => preset.getUser().equals(user));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getCurrentPresetByUser = ({ user }: { user: User }): Preset | undefined => {
    try {
        return presets.find(preset => preset.getUser().equals(user) && preset.getIsCurrent());
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createPreset = (preset: Preset): Preset => {
    presets.push(preset);
    return preset;
}

const getPresetByNameAndUser = ({ name, user }: { name: string, user: User }): Preset | undefined => {
    try {
        return presets.find(preset => 
            preset.getName() === name && preset.getUser() === user
        );
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getPresetsByUser,
    getCurrentPresetByUser,
    createPreset, 
    getPresetByNameAndUser
};
