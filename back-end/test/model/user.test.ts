import { User } from "../../model/user";


test('given: valid values for user, when: user is created, then: user is created', () => {
    // given
    const username = 'john_doe';
    const password = 'john123';

    // when
    const user = new User({
        username,
        password,
    });

    // then
    expect(user.getUsername()).toBe(username);
    expect(user.getPassword()).toBe(password);
});

test('given: invalid values for user, when: user is created, then: error is thrown', () => {
    // given
    const username = '';
    const password = 'john123';

    // when then
    expect(() => {
        new User({
            username,
            password,
        });
    }).toThrow('Username is required'); 
});

test('given: too short of a password for user, when: user is created, then: error is thrown', () => {
    // given
    const username = 'john_doe';
    const password = 'short'; // Invalid password (less than 6 characters)

    // when then
    expect(() => {
        new User({
            username,
            password,
        });
    }).toThrow('Password must be at least 6 characters long'); 
});

test('given: invalid password for user, when: user is created, then: error is thrown', () => {
    // given
    const username = 'john_doe';
    const password = ''; // Invalid password (less than 6 characters)

    // when then
    expect(() => {
        new User({
            username,
            password,
        });
    }).toThrow('Password is required'); 
});


