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