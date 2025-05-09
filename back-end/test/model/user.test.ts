import { User } from "../../model/user";
import { Role } from "../../types";

// EXPECTED VALUES _______________________________________________________________________________

const valid = {
    username: 'john_doe',
    password: 'john1234',
    role: 'user' as Role,
}
const error = {
    shortUserName: 'Username must be at least 3 characters long',
    shortPassword: 'Password must be at least 8 characters long',
    invalidCharPassword: 'Password must contain at least one letter and one number',
}

// CREATE USER ___________________________________________________________________________________

test('given: valid values for user, when: user is created, then: user is created', () => {
    // GIVEN ------------------------------------
    const username = valid.username;
    const password = valid.password;
    const role = valid.role;

    // WHEN -------------------------------------
    const user = new User({
        username,
        password,
        role,
    });

    // THEN -------------------------------------
    expect(user.username).toBe(username);
    expect(user.password).toBe(password);

});

test('given: too short username for user, when: user is created, then: error is thrown', () => {
    // GIVEN ------------------------------------
    const shortUsername = 'us';
    const password = valid.password;
    const role = valid.role;

    // WHEN -------------------------------------
    expect(() => {
        new User({
            username: shortUsername,
            password,
            role,
        });

    // THEN -------------------------------------
    }).toThrow(error.shortUserName); 

});

test('given: too short password for user, when: user is created, then: error is thrown', () => {
    // GIVEN ------------------------------------
    const username = valid.username;
    const shortPassword = 'p1';
    const role = valid.role;

    // WHEN -------------------------------------
    expect(() => {
        new User({
            username,
            password: shortPassword,
            role,
        });

    // THEN -------------------------------------
    }).toThrow(error.shortPassword); 

});

test('given: password without number for user, when: user is created, then: error is thrown', () => {
    // GIVEN ------------------------------------
    const username = valid.username;
    const invalidPassword = 'password';
    const role = valid.role;

    // WHEN -------------------------------------
    expect(() => {
        new User({
            username,
            password: invalidPassword,
            role,
        });

    // THEN -------------------------------------
    }).toThrow(error.invalidCharPassword);

});