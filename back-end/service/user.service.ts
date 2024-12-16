import userDB from '../repository/user.db';

// RETRIEVAL _______________________________________________________________________________________

const getUserById = async ({ id }: { id: number }) => {
    const user = await userDB.getUserById({ id });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}


export default { 
    getUserById,
};