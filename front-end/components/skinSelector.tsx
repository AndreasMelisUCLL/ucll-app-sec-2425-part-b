import PresetService from "@/services/presetService";
import { PieceType } from "@/types";
import { Loadout } from "@/types";
import { useState } from "react";

const SkinSelector: React.FC = () => {
    // create a state to store the theme per piece type (Rook, Bishop, etc)
    const [loadout, setLoadout] = useState<Loadout>({
        KING: "Default",
        QUEEN: "Default",
        ROOK: "Default",
        BISHOP: "Default",
        KNIGHT: "Default",
        PAWN: "Default",
    });

    const toPieceType = (piece: string): PieceType => {
        return PieceType[piece];
    };

    // create a function to save the selected preset
    const savePreset = async () => {
        const presetInput = {
            id: 1,
            name: "My Preset",
            reskins: Object.keys(loadout).map((piece) => ({
                for: toPieceType(piece),
                theme: loadout[piece],
            })),
            user: {
                id: 1,
                username: "test",
                password: "testtest",
            },
            isCurrent: true,
        }
        console.log(presetInput);
        await PresetService.savePreset(presetInput);
    }

    // Display two rows of three cards
    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {Object.keys(loadout).map((piece) => (
                    <div key={piece} className="bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold">{piece}</h2>
                        <select
                            className="mt-2 p-2 w-full"
                            value={loadout[piece]}
                            onChange={(e) => setLoadout({ ...loadout, [piece]: e.target.value })}
                        >
                            <option value="default">Default</option>
                            <option value="modern">Modern</option>
                            <option value="fancy">Fancy</option>
                        </select>
                    </div>
                ))}
                <button 
                  className="bg-blue-500 text-white p-2 rounded-lg mt-4"
                  onClick={savePreset}>
                  Save
                </button>
            </div>
        </>
        // add a save button to save the selected preset
    );
    
};

export default SkinSelector;