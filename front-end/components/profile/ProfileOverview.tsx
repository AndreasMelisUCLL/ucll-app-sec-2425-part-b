import { PieceCode, Preset, Reskin, User } from "@/types";
import ChessBoard from "./ChessBoard";
import styles from "@/styles/ProfileOverview.module.css";
import { useState, useEffect, use } from "react";
import presetService from "@/services/presetService";
import PresetsOverview from "./PresetsOverview";
import PresetCreator from "./PresetCreator";

const reskins = [
    { 
        piece: "wK" as PieceCode, 
        theme: { name: "california" } 
    },
    { 
        piece: "wQ" as PieceCode, 
        theme: { name: "horsey" } 
    },
    { 
        piece: "wR" as PieceCode, 
        theme: { name: "california" } 
    },
    { 
        piece: "wB" as PieceCode, 
        theme: { name: "horsey" } },
    { 
        piece: "bP" as PieceCode, 
        theme: { name: "california" } 
    },
];
const perspective = "black";
const position = {a8: 'bK', a7:'bP', b7:'bP', b8: 'bR', c7: 'wN', e5: 'wK'};

const ProfileOverview: React.FC = () => {
    const [ presets, setPresets ] = useState<Preset[]>([]);
    const [ selectedPreset, setSelectedPreset ] = useState<Preset | null>(null);
    const [ loadout, setLoadout ] = useState<Reskin[]>([]);
    const [ action, setAction ] = useState<"View" | "Create">("View");

    const fetchPresets = async () => {
        presetService.getPresets()
            .then(setPresets);
    }

    useEffect(() => {}, [presets]);

    useEffect(() => {
        fetchPresets();
    }, []);
    
    return (
        <div className="flex justify-center max-w-[100%] max-h-[100%] gap-5">
            <ChessBoard 
                boardSize={400}
                reskins={loadout}
                // position={position}
                // perspective={perspective}
            />
                <div className="w-[100%] max-w-[300px]">
                    {action === "Create" ? (  
                        <PresetCreator 
                            loadout={loadout}
                            setLoadout={setLoadout}
                            onConfirm={() => {
                                setAction("View");
                                fetchPresets();
                            }}
                            onCancel={() => {setAction("View")}}
                        />
                    ) : (
                        <>
                        <PresetsOverview 
                            presets={presets}
                            selectedPreset={selectedPreset}
                            onSelectPreset={(preset) => {
                                setSelectedPreset(preset);
                                setLoadout(preset.reskins);
                            }}
                            onConfirmPreset={(preset) => {
                                presetService
                                .putActivePreset(preset.id!)
                                .then(() => fetchPresets());
                            }}
                        />
                        <button
                            onClick={() => setAction("Create")}
                        >
                            New preset
                        </button>
                        </>
                    )}
            </div>
        </div>
    );
}

export default ProfileOverview;