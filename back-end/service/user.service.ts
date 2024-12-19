import { User } from '@prisma/client';
import userDB from '../repository/user.db';
import { UserInput }  from '../types'

// RETRIEVAL _______________________________________________________________________________________

const getUserById = async ({ id }: { id: number }) => {
    const user = await userDB.getUserById({ id });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

const createUser = async ({username, password}: UserInput): Promise<User> => {
    return null
}

export default { 
    getUserById,
};