import { User as UserPrisma } from "@prisma/client";
import { Role } from "../types";

// USER __________________________________________________________________________________________
export class User {

    readonly id?: number;
    readonly username: string;
    readonly password: string;
    readonly role: Role;


    // CONSTRUCTOR -------------------------------
    constructor(user: {
        id?: number,
        username: string, 
        password: string,
        role: Role
    }) {
        User.validate(user);

        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }


    // STATICS ----------------------------------
    static validate(user: {
        id?: number,
        username: string, 
        password: string,
        role: Role
    }) {
        // username
        if (user.username.length < 3) {
            throw new Error("Username must be at least 3 characters long");
        }
        const usernameRegex = /^[a-zA-Z0-9_]+$/; // Only alphanumeric + underscore, min. 3 chars
        if (!usernameRegex.test(user.username)) {
            throw new Error("Username can only contain letters, numbers, and underscores");
        }

        // password
        if (user.password.length < 8) {
            throw new Error("Password must be at least 8 characters long");
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/; // Min 1 letter and number, min. 8 chars
        if (!passwordRegex.test(user.password)) {
            throw new Error("Password must contain at least one letter and one number");
        }
    }

    
    // EQUALS -----------------------------------
    equals(user: User): boolean {
        return this.username === user.username;
    }


    // FROM -------------------------------------
    static from(userPrisma: UserPrisma): User {
        return new User({
            id: userPrisma.id,
            username: userPrisma.username,
            password: userPrisma.password,
            role: userPrisma.role as Role,
        });
    }
}