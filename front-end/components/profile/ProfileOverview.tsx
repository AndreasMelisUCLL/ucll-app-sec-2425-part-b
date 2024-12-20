import { PieceCode, Preset, Reskin, User } from "@/types";
import ChessBoard from "./ChessBoard";
import styles from "@/styles/UserProfile.module.css";
import { useState, useEffect } from "react";
import presetService from "@/services/presetService";

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
    const [ activeUser, setActiveUser ] = useState<User | undefined>(undefined);
    const [ activePreset, setActivePreset ] = useState<Preset | undefined>(undefined);

    const [ reskinSelection, setReskinSelection ] = useState<Reskin[]>([]);
    const [ presets ] = useState<Preset[]>([]);

    useEffect(() => {
        const userJSON = sessionStorage.getItem("loggedInUser");      
        if (!userJSON) return;

        setActiveUser(JSON.parse(userJSON));
        if(!activeUser?.id) return;

        presetService.getPresets()
        presetService.getActivePreset()
            .then((preset) => {
                setActivePreset(preset);
                setReskinSelection(preset.reskins || []);
            })

    }, []);
    
    return (
        <div className={styles["profile-container"]}>
            <ChessBoard 
                reskins={reskinSelection}
                // position={position}
                // perspective={perspective}
            />
            <div className={styles["user-info"]}>
                <h2>User Information</h2>
                <p>
                    Username: <br />
                    {activeUser?.username} <br />
                </p>
                <p>
                    Bio: <br />
                    A passionate chess player and software developer. 
                    Loves to solve complex problems and contribute to open-source projects.</p>
            </div>
        </div>
    );
}

export default ProfileOverview;