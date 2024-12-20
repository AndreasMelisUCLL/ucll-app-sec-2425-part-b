import jwt  from "jsonwebtoken";

const generateJwtToken = ({ username, role, userId }: { username: string; role: string; userId: number }): string => {
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'BoardFlex'};
    try {
        return jwt.sign({username, role, userId}, `${process.env.JWT_SECRET}`, options);
    } catch (error) {
        console.log(error)
        throw new Error("Error generating jwt Token, check log")
    }
};


export {generateJwtToken}