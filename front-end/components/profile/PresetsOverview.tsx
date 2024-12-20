import { Preset } from "@/types";
import styles from '@/styles/ProfileOverview.module.css';

interface PresetsOverviewProps {
    presets: Preset[];
    selectedPreset: Preset | null;
    onSelectPreset: (preset: Preset) => void;
    onConfirmPreset: (preset: Preset) => void;
}

const PresetsOverview = ({ 
    presets,
    selectedPreset,
    onSelectPreset,
    onConfirmPreset
}: PresetsOverviewProps) => {
    const isSelected = (preset: Preset) => {
        return preset.id === selectedPreset?.id;
    }
    return (
        <>
            <h2>Your presets</h2>
            {presets.map((preset) => (
                <div 
                    key={preset.id} 
                    className={styles[isSelected(preset) ? 'activePreset' : 'preset']}
                    onClick={() => onSelectPreset(preset)}                        
                >
                    <h3>{preset.name + (preset.isActive ? " (active)" : "")}</h3>
                    {preset.id === selectedPreset?.id && (
                        <div>
                            <button 
                                onClick={() => onConfirmPreset(preset)}
                            >
                                Set Active
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}

export default PresetsOverview;