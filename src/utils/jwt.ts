import { sign, verify } from 'jsonwebtoken';

interface TokenPayload {
  email: string;
  userId: string;
}

const generateJwt = (payload: TokenPayload, secret: string, expiresIn: string) => {
  return sign(payload, secret, { expiresIn });
}

const verifyJwt = (token: string, secret: string) => {
  try {
    const decoded = verify(token, secret);
    return decoded as TokenPayload;
  } catch (error) {
    return null;
  }
}

export { generateJwt, verifyJwt };