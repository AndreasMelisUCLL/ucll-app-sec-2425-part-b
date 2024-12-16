import { get } from "http";
import themeDb from "../../repository/theme.db";
import themeService from "../../service/theme.service";

// EXPECTED VALUES _______________________________________________________________________________

const valid = {
    id: 1,
    name: 'default',
    description: 'default theme',
};

// MOCK SETUP ____________________________________________________________________________________

let mockThemeDbGetThemeById: jest.Mock;

beforeEach(() => {
    mockThemeDbGetThemeById = jest.fn();
});
afterEach(() => {
    jest.clearAllMocks();
});

// GET THEME BY ID ________________________________________________________________________________

test('given: valid theme id, when: invoking getThemeById, then: theme is returned', async () => {
    // GIVEN ------------------------------------
    const id = valid.id;

    // MOCK -------------------------------------
    themeDb.getThemeById = mockThemeDbGetThemeById.mockReturnValue(valid);
    
    // WHEN -------------------------------------
    const theme = await themeService.getThemeById({ id });

    // THEN -------------------------------------
    expect(theme).toEqual(valid);

});

test('given: invalid theme id, when: invoking getThemeById, then: error is thrown', () => {
    // GIVEN ------------------------------------
    const id = -1;

    // MOCK -------------------------------------
    themeDb.getThemeById = mockThemeDbGetThemeById.mockReturnValue(null);

    // WHEN -------------------------------------
    const getThemeById = async () => 
        themeService.getThemeById({ id });

    // THEN -------------------------------------
    expect(getThemeById).rejects.toThrow(
        `Theme with id ${id} not found`
    );
});