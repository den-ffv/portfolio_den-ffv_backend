import jwt from "jsonwebtoken"
class TokenService{
    generateToken(payload: Record<string, any>): string{
        const secretKey = process.env.JWT_SECRET_KEY;

        if (!secretKey) {
            throw new Error("JWT access secret key is not defined.");
        }
        const token: string = jwt.sign(payload, secretKey, {
            expiresIn: "30m",
        });
        return token
    }
}

export default new TokenService()