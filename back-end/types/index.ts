type PieceInput = {
    color: string;
    type: string;
}

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
}

type AuthenticationResponse = {
    token: string;
    username: string;
}

export {
    PieceInput,
    PresetInput,
    ReskinInput,
    UserInput,
    AuthenticationResponse
}