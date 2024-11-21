import { PieceDTO, Reskin } from '@/types';


const getReskinsByPiece = async (piece: PieceDTO): Promise<Array<Reskin>> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reskin/${piece.color}/${piece.type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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