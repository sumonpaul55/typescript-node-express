import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = (JwtPayload: JwtPayload, secret: string, expire: string) => {
  return jwt.sign(JwtPayload, secret, { expiresIn: expire });
};
