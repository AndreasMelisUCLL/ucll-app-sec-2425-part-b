import { User } from '../model/user';
import userDB from '../repository/user.db';
import { AuthenticationResponse, UserInput }  from '../types';
import bcrypt from 'bcrypt';
import {generateJwtToken} from '../util/jwt'

// RETRIEVAL _______________________________________________________________________________________

const getUserById = async ({ id }: { id: number }) => {
    const user = await userDB.getUserById({ id });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

const getUserByUsername = async ({ username, role }: { username: string, role?: string }) => {
    let user;
    if (role === "admin") {
        user = await userDB.getAllUsers();
    } else {
        user = await userDB.getUserByUsername({ username });
    }

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

const authenticate = async({username, password}: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({username}) as User;
    if (!user.password) {
        throw new Error("Password not found");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword){
        throw new Error("Incorrect Password")
    }

    return {
        token: generateJwtToken({username, role: user.role, userId: user.id!}),
        username,
        role: user.role,
        userId: user.id!,
    }
};

const createUser = async ({username, password, role,}: UserInput): Promise<User> => {
    const existing = await userDB.getUserByUsername({username});
    if(existing){
        throw new Error(`user with username ${username} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password,12);
    const user = new User({username, password: hashedPassword, role});
    
    return await userDB.createUser(user)
}

export default { 
    getUserById,createUser, authenticate, getUserByUsername
};