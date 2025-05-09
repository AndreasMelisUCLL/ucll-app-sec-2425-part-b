import { Role }     from "../../types";

import { User }     from "../../model/user";

import userService  from "../../service/user.service";

import userDB       from "../../repository/user.db";

// MOCK SETUP ____________________________________________________________________________________

let mockUserDbGetUserById: jest.Mock;

beforeEach(() => {
    mockUserDbGetUserById = jest.fn();
});
afterEach(() => {
    jest.clearAllMocks();
});

// EXPECTED VALUES _______________________________________________________________________________

const valid = {
    id: 1,
    username: 'john_doe',
    password: 'john1234',
    role: 'user' as Role,
};

// GET USER BY ID ________________________________________________________________________________

test('given: valid id, when: invoking getUserById, then: user is returned', async () => {  
    // GIVEN ------------------------------------
    const id = valid.id;

    // MOCK -------------------------------------
    userDB.getUserById = mockUserDbGetUserById.mockReturnValue(new User(valid));
    
    // WHEN -------------------------------------
    const foundUser = await userService.getUserById({ id });

    // THEN -------------------------------------
    expect(mockUserDbGetUserById).toHaveBeenCalledWith({ id })
    expect(foundUser.id).toEqual(id);

});