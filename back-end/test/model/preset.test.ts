import { Piece } from "../../model/piece";
import { Preset }   from "../../model/preset";
import { Reskin }   from "../../model/reskin";
import { Theme }    from "../../model/theme";
import { User }     from "../../model/user";

// EXPECTED VALUES _______________________________________________________________________________

const valid = {
    name: 'preset1',
    user: new User({ 
            username: 'john_doe', 
            password: 'john123'
        }),
    reskins: [
        new Reskin({
            piece: new Piece({
                color: "WHITE",
                type: "KING",
            }),
            theme: new Theme({
                name: "sniper bishop",
                description: "sniper bishops",
            })
        })
    ]
}

// CREATE PRESET _________________________________________________________________________________

test('given: valid values for preset, when: preset is created, then: preset is created', () => {
    // GIVEN ------------------------------------
    const name = valid.name;
    const user = valid.user;
    const reskins = valid.reskins

    // WHEN -------------------------------------
    const preset = new Preset({
        name, 
        user,
        reskins, 
    });

    // THEN -------------------------------------
    expect(preset.name).toBe(name);
    expect(preset.user).toBe(user);
    expect(preset.reskins).toBe(reskins);

});

test('given: blank name, when: preset is created, then: error is thrown', () => {
    // GIVEN ------------------------------------
    const name = ' ';
    const reskins = valid.reskins;
    const user = valid.user;

    // WHEN -------------------------------------
    expect(() => {
        new Preset({
            name, 
            reskins, 
            user,
        })

    // THEN -------------------------------------
    }).toThrow('Name cannot be blank');

});

test('given: multiple reskins for the same piece, when: preset is created, then: error is thrown', () => {
    // GIVEN ------------------------------------
    const name = valid.name;
    const user = valid.user

    const duplicatePiece = new Piece({
        color: 'WHITE',
        type: 'KING',
    });

    const reskins: Reskin[] = [
        new Reskin({
            piece: duplicatePiece,
            theme: new Theme({
                name: 'default', 
                description: 'default theme'
            })
        }),
        new Reskin({
            piece: duplicatePiece,
            theme: new Theme({
                name: 'default', 
                description: 'default theme'
            })
        }),
    ];

    // WHEN -------------------------------------
    expect(() => {
        new Preset({
            name, 
            reskins, 
            user
        })

    // THEN -------------------------------------
    }).toThrow("Cannot have multiple reskins for the same piece");

});