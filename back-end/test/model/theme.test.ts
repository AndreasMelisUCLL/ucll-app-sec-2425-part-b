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