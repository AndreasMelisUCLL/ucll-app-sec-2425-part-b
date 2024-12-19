import { User } from '../model/user';
import userDB from '../repository/user.db';
import { UserInput }  from '../types';
import bcrypt from 'bcrypt';

// RETRIEVAL _______________________________________________________________________________________

const getUserById = async ({ id }: { id: number }) => {
    const user = await userDB.getUserById({ id });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

const createUser = async ({username, password}: UserInput): Promise<User> => {
    const existing = await userDB.getUserByUsername({username});
    if(existing){
        throw new Error(`user with username ${username} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password,12);
    const user = new User({username, password: hashedPassword});
    
    return await userDB.createUser(user)
}

export default { 
    getUserById,createUser
};