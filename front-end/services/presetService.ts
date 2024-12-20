import { Preset } from "@/types";

const savePreset = async (loadout: any): Promise<any> => {
    try {
        const storedUser = sessionStorage.getItem('loggedInUser');
        const token = storedUser ? JSON.parse(storedUser).token : undefined;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preset`, {
            method: 'POST',
            body: JSON.stringify(loadout),
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error saving preset:', error);
        throw error;
    }
}

const getActivePresetByUser = async ({ userId }: { userId: number }): Promise<Preset> => {
    try {
        const storedUser = sessionStorage.getItem('loggedInUser');
        const token = storedUser ? JSON.parse(storedUser).token : undefined;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preset/active/${userId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting active preset:', error);
        throw error;
    }
}

const getActivePreset = async (): Promise<Preset> => {
    try {
        const storedUser = sessionStorage.getItem('loggedInUser');
        const id = storedUser ? JSON.parse(storedUser).userId : undefined;
        
        return await getActivePresetByUser({ userId: id });
    } catch (error) {
        console.error('Error getting active preset:', error);
        throw error;
    }
}

const getPresetsByUser = async ({userId}: {userId: number}): Promise<Preset[]> => {
    try {
        const storedUser = sessionStorage.getItem('loggedInUser');
        const token = storedUser ? JSON.parse(storedUser).token : undefined;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preset/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting presets:', error);
        throw error;
    }
}

const getPresets = async (): Promise<Preset[]> => {
    try {
        const storedUser = sessionStorage.getItem('loggedInUser');
        const id = storedUser ? JSON.parse(storedUser).userId : undefined;
        console.log(storedUser);
        
        return await getPresetsByUser({ userId: id });
    } catch (error) {
        console.error('Error getting presets:', error);
        throw error;
    }
}

const putActivePreset = async (presetId: number): Promise<any> => {
    try {
        const storedUser = sessionStorage.getItem('loggedInUser');
        const token = storedUser ? JSON.parse(storedUser).token : undefined;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/preset/active/${presetId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error setting active preset:', error);
        throw error;
    }
}
    

export default {
    savePreset,
    getPresetsByUser,
    getActivePresetByUser,
    getPresets,
    getActivePreset,
    putActivePreset,
}