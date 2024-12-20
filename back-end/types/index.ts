import { PieceCode } from "../model/piece";

type PieceInput = {
    color: string;
    type: string;
}

type Role = "admin" | "user";

type PresetInput = {
    userId: number;
    name: string;
    reskinInputs: ReskinInput[];
};

type ReskinInput = {
    pieceInput: PieceInput;
    themeId: number;
}

type presetDTO = {
    id?: number;
    name: string;
    userId: number;
    reskins: ReskinDTO[];
}

type ReskinDTO = {
    piece: PieceCode;
    theme: {
        id?: number;
        name: string;
    }
}

type UserInput = {
    id?: number;
    username: string;
    password: string;
    role: Role;
}

type AuthenticationResponse = {
    token: string;
    username: string;
    role: string;
    userId: number;
}

declare global {
    namespace Express {
        interface Request {
            auth: any; 
        }
    }
}

export {
    PieceInput,
    PresetInput,
    ReskinInput,
    UserInput,
    AuthenticationResponse,
    Role
}