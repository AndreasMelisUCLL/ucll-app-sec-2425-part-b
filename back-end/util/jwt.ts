import jwt  from "jsonwebtoken";

const generateJwtToken = ({ username, role }: { username: string; role: string }): string => {
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'BoardFlex'};
    try {
        return jwt.sign({username, role}, `${process.env.JWT_SECRET}`, options);
    } catch (error) {
        console.log(error)
        throw new Error("Error generating jwt Token, check log")
    }
};


export {generateJwtToken}