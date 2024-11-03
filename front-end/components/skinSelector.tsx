import PresetService from "@/service/presetService";
import { Loadout } from "@/types";
import { useState } from "react";

const SkinSelector: React.FC = () => {
    // create a state to store the theme per piece type (Rook, Bishop, etc)
    const [loadout, setLoadout] = useState<Loadout>({
        KING: "Classic",
        QUEEN: "Classic",
        ROOK: "Classic",
        BISHOP: "Classic",
        KNIGHT: "Classic",
        PAWN: "Classic",
    });

    // create a function to save the selected preset
    const savePreset = async () => {
        console.log(loadout);
        const presetInput = {
            id: 1,
            name: "My Preset",
            reskins: Object.keys(loadout).map((piece) => ({
                id: Math.random(),
                for: piece,
                theme: loadout[piece],
            })),
            user: {
                id: 1,
                username: "test",
                password: "testtest",
            },
            isCurrent: true,
        }
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
                            <option value="Classic">Classic</option>
                            <option value="Modern">Modern</option>
                            <option value="Fancy">Fancy</option>
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