import { User } from "../model/user";
import database from "../util/database";

// METHODS _______________________________________________________________________________________

const getUserById = async ({ id }: { id: number }) => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id
            }
        });
        return userPrisma
            ? User.from(userPrisma)
            : null;

    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAllUsers = async () => {
    try {
        const userPrisma = await database.user.findMany({
        });
        return userPrisma
            ? userPrisma.map(user => User.from(user))
            : null;

    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getUserByUsername = async ({ username }: { username: string }) => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                username
            }
        });
        return userPrisma
            ? User.from(userPrisma)
            : null;
            
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createUser = async({
    username,
    password,
    role
}: User): Promise<User> =>{
    try {
        const userPrisma = await database.user.create({
            data: {username, password, role}
        })
        return User.from(userPrisma)
    } catch (error) {
        console.error(error);
        throw new Error("Database error, check log")
    }
};

export default { 
    getUserById,
    getUserByUsername,
    createUser,
    getAllUsers,
};