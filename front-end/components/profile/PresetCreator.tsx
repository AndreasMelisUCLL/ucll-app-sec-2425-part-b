
import styles from "@/styles/ProfileOverview.module.css";
import { useEffect, useState } from 'react';
import { PieceColor, Reskin } from '@/types';
import reskinService from '@/services/reskinService';

const pieceTypes = ["KING", "QUEEN", "ROOK", "BISHOP", "KNIGHT", "PAWN"];
const colors = ["White", "Black"];
const pieces = pieceTypes.flatMap((type) => colors.map((color) => ({ type, color })));
const pieceToString = (piece: { type: string, color: string }) => `${piece.color} ${piece.type}`;

interface PresetCreatorProps {
    loadout: Reskin[];
    setLoadout: (loadout: Reskin[]) => void;
    onConfirm: () => void;
    onCancel: () => void;
}
const PresetCreator = ({
    setLoadout,
    onConfirm,
    onCancel
}: PresetCreatorProps) => {
    const [themesPerPiece, setThemesPerPiece] = useState<Map<string, Reskin[]>>(new Map());
    const [reskinPerPiece, setReskinPerPiece] = useState<Map<string, Reskin>>(new Map());

    useEffect(() => {
        const fetchThemes = async () => {
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
            {colors.map((color) => (
                <>
                <h3>{color}</h3>
                <div className={styles['reskins']}>
                    {pieceTypes.map((pieceType) => (
                        <select
                            value={reskinPerPiece.get(`${color} ${pieceType}`)?.theme.name}
                        >
                            <option value={undefined}>Default</option>
                            {themesPerPiece.get(`${color} ${pieceType}`)?.map((reskin: Reskin) => 
                                    <option value={reskin.theme.name}>{reskin.theme.name}</option>
                        )}
                        </select>
                    ))}
                </div>
                </>
            ))}
            <button onClick={onCancel}>Cancel</button>
            <button>Save</button>
        </form>
    );
}

export default PresetCreator;