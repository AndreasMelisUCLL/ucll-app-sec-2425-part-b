import { User } from "../../model/user";

// EXPECTED VALUES _______________________________________________________________________________

const valid = {
    username: 'john_doe',
    password: 'john123',
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

    // WHEN -------------------------------------
    const user = new User({
        username,
        password,
    });

    // THEN -------------------------------------
    expect(user.username).toBe(username);
    expect(user.password).toBe(password);

});

test('given: blank username for user, when: user is created, then: error is thrown', () => {
    // GIVEN ------------------------------------
    const blankUsername = ' ';
    const password = valid.password;

    // WHEN -------------------------------------
    expect(() => {
        new User({
            username: blankUsername,
            password,
        });

    // THEN -------------------------------------
    }).toThrow(error.blankUserName); 

});

test('given: blank password for user, when: user is created, then: error is thrown', () => {
    // GIVEN ------------------------------------
    const username = valid.username;
    const blankPassword = ' ';

    // WHEN -------------------------------------
    expect(() => {
        new User({
            username,
            password: blankPassword,
        });

    // THEN -------------------------------------
    }).toThrow(error.blankPassword); 

});

test('given: too short of a password for user, when: user is created, then: error is thrown', () => {
    // GIVEN ------------------------------------
    const username = valid.username;
    const shortPassword = '123';

    // WHEN -------------------------------------
    expect(() => {
        new User({
            username,
            password: shortPassword,
        });

    // THEN -------------------------------------
    }).toThrow(error.shortPassword);

});