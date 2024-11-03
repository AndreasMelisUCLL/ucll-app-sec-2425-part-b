import { PieceType, Color } from "../model/enumTypes";
import { Preset } from "../model/preset";
import { Reskin } from "../model/reskin";
import { Theme } from "../model/theme";
import { User } from "../model/user";
import { PresetInput } from "../types";


const user: User = new User({
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
        for: PieceType.KING,
        as: Color.WHITE,
        theme: defaultTheme
    }),
    new Reskin({
        for: PieceType.KING,
        as: Color.BLACK,
        theme: defaultTheme
    }),
    new Reskin({
        for: PieceType.QUEEN,
        as: Color.WHITE,
        theme: minionTheme
    }),
    new Reskin({
        for: PieceType.QUEEN,
        as: Color.BLACK,
        theme: minionTheme
    }),
    new Reskin({
        for: PieceType.ROOK,
        as: Color.WHITE,
        theme: defaultTheme
    }),
    new Reskin({
        for: PieceType.ROOK,
        as: Color.BLACK,
        theme: defaultTheme
    }),
    new Reskin({
        for: PieceType.BISHOP,
        as: Color.WHITE,
        theme: defaultTheme
    }),
    new Reskin({
        for: PieceType.BISHOP,
        as: Color.BLACK,
        theme: defaultTheme
    }),
    new Reskin({
        for: PieceType.KNIGHT,
        as: Color.WHITE,
        theme: defaultTheme
    }),
    new Reskin({
        for: PieceType.KNIGHT,
        as: Color.BLACK,
        theme: defaultTheme
    }),
    new Reskin({
        for: PieceType.PAWN,
        as: Color.WHITE,
        theme: defaultTheme
    }),
    new Reskin({
        for: PieceType.PAWN,
        as: Color.BLACK,
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

const getPresetByNameAndUser = ({ name, userId }: { name: string, userId: number }): Preset | undefined => {
    try {
        return presets.find(preset => 
            preset.getName() === name && preset.getUser().getId() === userId
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
