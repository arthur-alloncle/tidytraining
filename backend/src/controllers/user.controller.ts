import { Request, Response, NextFunction } from "express";
import { MikroORM, RequestContext } from "@mikro-orm/mariadb";
import { User } from "../entity/user.entity.js";
import bcrypt from "bcrypt";
import { ApiResponse } from "../types/api-response.js";
import { ApiError } from "../utils/ApiError.js";

export const findUserById = async (
  req: Request,
  res: Response<ApiResponse<User>>,
  next: NextFunction
) => {
  try {
    const em = RequestContext.getEntityManager();
    await em
      ?.findOne<any>(User, -1)
      .then(async (user) => {
        if (!user) throw ApiError.notFound();
        return res.status(200).json({ success: true, data: user });
      })
      .catch((e: any) => {
        next(e);
      });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response<ApiResponse<any>>,
  next: NextFunction
) => {
  try {
    const em = RequestContext.getEntityManager();
    const userId = req.user?.userId;
    if (!userId) throw ApiError.unauthorized();
    let r: any;
    const user = await em?.findOne(User, { id: userId });

    console.log(r);

    const { password: _, refreshToken, ...safeUser } = user as any;
    return res.status(200).json({ success: true, data: safeUser });
  } catch (error) {
    next(error);
  }
};
