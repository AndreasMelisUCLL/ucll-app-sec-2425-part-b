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
            data: {
                username, 
                password, 
                role,
                presets: {
                    create: {
                        name: 'default',
                    },
                },
            },
            include: {
                presets: true,
            },
        })

        // set default active preset
        await database.user.update({
            where: { id: userPrisma.id },
            data: { activePresetId: userPrisma.presets[0].id },
        });

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