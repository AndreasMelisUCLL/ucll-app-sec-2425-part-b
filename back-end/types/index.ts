import { Request } from 'express';
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