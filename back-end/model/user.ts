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
        if (user.username?.trim() === '') {
            throw new Error('Username is required');
        }

        // password
        if (user.password?.trim() === '') {
            throw new Error('Password is required');
        }
        if (user.password.length <= 6) {
            throw new Error("Password must be at least 6 characters long");
        }

        // role
        if (user.role?.trim() === '') {
            throw new Error('Role is required');
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