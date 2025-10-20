import { Request, Response, NextFunction } from "express";
import { MikroORM, RequestContext } from "@mikro-orm/mariadb";
import { User } from "../entity/user.entity.js";
import bcrypt from "bcrypt";
import { ApiResponse } from "../types/api-response.js";
import { ApiError } from "../utils/ApiError.js";

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
