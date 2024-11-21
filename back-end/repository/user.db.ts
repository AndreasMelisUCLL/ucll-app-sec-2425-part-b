import { User } from "../model/user";

// DUMMY DATA _____________________________________________________________________________________

const users: User[] = [
    new User({
        id: 1,
        username: "john_doe",
        password: "john123"
    }),
    new User({
        id: 2,
        username: "jane_toe",
        password: "jane123"
    })
];

// METHODS _______________________________________________________________________________________

const getUserById = ({ id }: { id: number }): User | undefined => {
    try {
        return users.find((user) => user.id === id);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getUserByUsername = ({ username }: { username: string }): User | undefined => {
    try {
        return users.find((user) => user.username === username);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default { 
    getUserById,
    getUserByUsername
};