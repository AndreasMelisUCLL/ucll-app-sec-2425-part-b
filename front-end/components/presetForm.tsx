import { Suspense, useEffect, useState } from "react"
import { Loadout, Reskin, Theme } from "@/types"
import reskinService from "@/services/reskinService"

const presetForm: React.FC = () => {
    // // create a state to store the theme per piece type (Rook, Bishop, etc)
    // const [loadout, setLoadout] = useState<Loadout>({});

    // // create a function to save the selected preset
    // const savePreset = async () => {
    //     console.log(loadout);
    // }

    const pieceTypes = ["KING", "QUEEN", "ROOK", "BISHOP", "KNIGHT", "PAWN"];
    const colors = ["White", "Black"];
    const pieces = pieceTypes.flatMap((type) => colors.map((color) => ({ type, color })));
    const pieceToString = (piece: { type: string, color: string }) => `${piece.color} ${piece.type}`;

    const [themesPerPiece, setThemesPerPiece] = useState<Map<string, Reskin[]>>(new Map());

    const [activeColor, setActiveColor] = useState<string>("White");

    // Display a form with one dropdown per piece type per color
    

    useEffect(() => {
        const fetchThemes = async () => {
            const themesPerPiece = new Map<string, Reskin[]>();
            for (const piece of pieces) {
                const reskins = await reskinService.getReskinsByPiece(piece);
                themesPerPiece.set(pieceToString(piece), reskins);
            }
            setThemesPerPiece(themesPerPiece);
        };

        fetchThemes();
    }, []);


    return (
        <form>
                <>
                    <h2>{activeColor}</h2>
                    {pieceTypes.map((pieceType) => (
                        <select
                            className="mt-2 p-2 w-full"
                            value={""}
                            onChange={() => {}}
                        >
                            <option value="">Default</option>
                            {themesPerPiece.get(`${activeColor} ${pieceType}`)?.map((reskin: Reskin) => 
                                    <option value={reskin.theme.id}>{reskin.theme.name}</option>
                            )}
                        </select>
                    ))}
                </>
        </form>
    ); 
}

export default presetForm;