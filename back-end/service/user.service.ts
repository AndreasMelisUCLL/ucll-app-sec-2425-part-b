import userDB from '../repository/user.db';

const getUserById = ({ id }: { id: number }) => {
    const user = userDB.getUserById({ id });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

export default { getUserById };