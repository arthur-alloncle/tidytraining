import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { RequestContext } from "@mikro-orm/core";
import { User } from "../entity/user.entity.js";
import { ApiError } from "../utils/ApiError.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  REFRESH_COOKIE_NAME,
} from "../utils/jwt.js";
import { ApiResponse } from "../types/api-response.js";

export const createUser = async (
    req: Request,
    res: Response<ApiResponse<Omit<User, "password">>>,
    next: NextFunction
  ) => {
    try {
      const em = RequestContext.getEntityManager();
  
      const { first_name, last_name, email, password } = req.body;
  
      // Check if user already exists by email
      const existing = await em?.findOne(User, { email });
      if (existing) {
        throw ApiError.conflict("Account already exists");
      }
  
      const hash = await bcrypt.hash(password, 10);
  
      const user = em?.create(User, {
        first_name,
        last_name,
        email,
        password: hash,
        refreshToken: null,
        created_at: new Date(),
        updated_at: new Date(),
      });
  
      if (!user) {
        throw ApiError.internal();
      }
  
      // Hide password in response
      await em?.persistAndFlush(user);
      const { password: _, ...safeUser } = user;
  
      return res.status(201).json({
        success: true,
        data: safeUser,
      });
    } catch (error) {
      next(error);
    }
  };

export const loginUser = async (
  req: Request,
  res: Response<ApiResponse<any>>,
  next: NextFunction
) => {
  try {
    const em = RequestContext.getEntityManager();
    const { email, password } = req.body;

    const user = await em?.findOne(User, { email });
    if (!user) throw ApiError.unauthorized("Invalid credentials");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw ApiError.unauthorized("Invalid credentials");

    const accessToken = signAccessToken({ userId: user.id });
    const refreshToken = signRefreshToken({ userId: user.id });

    // Persist refresh token - can be compared / invalidated
    user.refreshToken = refreshToken;
    await em?.persistAndFlush(user);

    res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, refreshToken: rt, ...safeUser } = user as any;
    return res
      .status(200)
      .json({ success: true, data: { user: safeUser, accessToken } });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response<ApiResponse<null>>,
  next: NextFunction
) => {
  try {
    const em = RequestContext.getEntityManager();
    const token = req.cookies[REFRESH_COOKIE_NAME];
    if (token) {
      try {
        const payload: any = verifyRefreshToken(token);
        const user = await em?.findOne(User, { id: Number(payload.userId) });
        if (user) {
          user.refreshToken = null;
          await em?.persistAndFlush(user);
        }
      } catch (_) {
        // ignore invalid token
      }
    }
    res.clearCookie(REFRESH_COOKIE_NAME, { path: "/api/auth/refresh" });
    return res.status(200).json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response<ApiResponse<any>>,
  next: NextFunction
) => {
  try {
    const em = RequestContext.getEntityManager();
    const token = req.cookies[REFRESH_COOKIE_NAME];
    if (!token) throw ApiError.unauthorized("No refresh token");

    const payload = verifyRefreshToken(token);
    const user = await em?.findOne(User, { id: Number(payload.userId) });

    if (!user || !user.refreshToken)
      throw ApiError.unauthorized("Invalid refresh token");
    if (user.refreshToken !== token)
      throw ApiError.unauthorized("Token mismatch");

    const newAccessToken = signAccessToken({ userId: user.id });
    const newRefreshToken = signRefreshToken({ userId: user.id });

    user.refreshToken = newRefreshToken;

    await em?.persistAndFlush(user);

    res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ success: true, data: { accessToken: newAccessToken } });
  } catch (error) {
    next(error);
  }
};
