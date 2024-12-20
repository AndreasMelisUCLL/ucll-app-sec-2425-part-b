import { User } from "../../model/user";
import { Role } from "../../types";

// EXPECTED VALUES _______________________________________________________________________________

const valid = {
    username: 'john_doe',
    password: 'john123',
    role: 'user' as Role,
}
const error = {
    blankUserName: 'Username is required',
    blankPassword: 'Password is required',
    shortPassword: 'Password must be at least 6 characters long',
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

test('given: blank username for user, when: user is created, then: error is thrown', () => {
    // GIVEN ------------------------------------
    const blankUsername = ' ';
    const password = valid.password;
    const role = valid.role;

    // WHEN -------------------------------------
    expect(() => {
        new User({
            username: blankUsername,
            password,
            role,
        });

    // THEN -------------------------------------
    }).toThrow(error.blankUserName); 

});

test('given: blank password for user, when: user is created, then: error is thrown', () => {
    // GIVEN ------------------------------------
    const username = valid.username;
    const blankPassword = ' ';
    const role = valid.role;

    // WHEN -------------------------------------
    expect(() => {
        new User({
            username,
            password: blankPassword,
            role,
        });

    // THEN -------------------------------------
    }).toThrow(error.blankPassword); 

});

test('given: too short of a password for user, when: user is created, then: error is thrown', () => {
    // GIVEN ------------------------------------
    const username = valid.username;
    const shortPassword = '123';
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