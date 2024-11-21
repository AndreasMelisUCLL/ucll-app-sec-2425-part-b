import { Theme } from "../../model/theme";

// VALID VALUES __________________________________________________________________________________

const valid = {
    name: 'default',
    description: 'the default theme',
}
const error = {
    blankName: 'Name is required',
    blankDescription: 'Description is required',
}

// CREATE THEME __________________________________________________________________________________

test('given: valid values for theme, when: theme is created, then: theme is created', () => {
    // GIVEN ------------------------------------
    const name = valid.name;
    const description = valid.description;

    // WHEN -------------------------------------
    const theme = new Theme({
        name,
        description,
    });

    // THEN -------------------------------------
    expect(theme.name).toBe(name);
    expect(theme.description).toBe(description);

});

test('given: blank name for theme, when: theme is created, then: error is thrown', () => {
    // GIVEN ------------------------------------
    const name = ' ';
    const description = 'default theme';

    // WHEN -------------------------------------
    expect(() => {
        new Theme({
            name,
            description,
        });

    // THEN -------------------------------------
    }).toThrow(error.blankName); 

});

test('given: blank description for theme, when: theme is created, then: error is thrown', () => {
    // GIVEN ------------------------------------
    const name = 'default theme';
    const description = ' ';
    
    // WHEN -------------------------------------
    expect(() => {
        new Theme({
            name,
            description,
        });

    // THEN -------------------------------------
    }).toThrow(error.blankDescription); 

});