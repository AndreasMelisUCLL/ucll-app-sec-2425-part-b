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
const PresetService = {
    savePreset,
}

export default PresetService;