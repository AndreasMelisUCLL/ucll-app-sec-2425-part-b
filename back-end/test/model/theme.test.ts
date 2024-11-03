import { Theme } from "../../model/theme";


test('given: valid values for theme, when: theme is created, then: theme is created', () => {
    // given
    const name = 'default';
    const description = 'default theme';

    // when
    const theme = new Theme({
        name,
        description,
    });

    // then
    expect(theme.getName()).toBe('default');
    expect(theme.getDescription()).toBe('default theme');
});

test('given: blank name for theme, when: theme is created, then: error is thrown', () => {
    // given
    const name = ' ';
    const description = 'default theme';

    // when then
    expect(() => {
        new Theme({
            name,
            description,
        });
    }).toThrow('Name is required'); 
});

test('given: blank description for theme, when: theme is created, then: error is thrown', () => {
    // given
    const name = 'default theme';
    const description = ' ';
    
    // when then
    expect(() => {
        new Theme({
            name,
            description,
        });
    }).toThrow('Description is required'); 
});