import { User } from "../../model/user";
import userDB from "../../repository/user.db";
import userService from "../../service/user.service";


let mockUserDbGetUserById: jest.Mock;


test('given: valid id, when: invoking getUserById, then: user is returned', () => {  
    // given
    const id = 1;
    const johnDoe = new User({ id, username: 'john_doe', password: 'john123' });

    mockUserDbGetUserById = jest.fn();
    userDB.getUserById = mockUserDbGetUserById.mockReturnValue(johnDoe);
    
    // when
    const foundUser = userService.getUserById({ id });

    // then
    expect(mockUserDbGetUserById).toHaveBeenCalledWith({ id })
    expect(foundUser).toEqual(johnDoe);
});