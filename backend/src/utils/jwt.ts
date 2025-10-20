import jwt, { SignOptions } from "jsonwebtoken";

// Note : need an env file for production env
const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "replace-this-secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "replace-this-refresh-secret";

export const signAccessToken = (payload: object, expiresIn: any = "15m") =>
  jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, ACCESS_TOKEN_SECRET) as any;

export const signRefreshToken = (payload: object, expiresIn: any = "7d") =>
  jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn });

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_TOKEN_SECRET) as any;

export const REFRESH_COOKIE_NAME: string = 'jid'
