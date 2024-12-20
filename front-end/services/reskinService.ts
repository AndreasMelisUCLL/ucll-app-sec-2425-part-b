import { PieceDTO, Reskin } from '@/types';


const getReskinsByPiece = async (piece: {color: string, type: string}): Promise<Array<Reskin>> => {
    try {
        const storedUser = sessionStorage.getItem('loggedInUser');
        const token = storedUser ? JSON.parse(storedUser).token : undefined;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reskin/${piece.color}/${piece.type}`, {
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
        console.error('Error getting reskins:', error);
        throw error;
    }
}

export default {
    getReskinsByPiece,
}