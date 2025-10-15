import { Request, Response, NextFunction } from "express";
import { MikroORM } from "@mikro-orm/mariadb";
import mconfig from "../mikro-orm.config.js";
import { User } from "../entity/user.entity.js";
import bcrypt from "bcrypt";

const orm = await MikroORM.init(mconfig);
const em = orm.em.fork();

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const saltRouds = 10;
    const passwordString = req.body.password;
    const user = new User();
    let password = '';

    user.first_name = req.body.firstName;
    user.last_name = req.body.lastName;
    user.email = req.body.email;

    bcrypt.hash(passwordString, saltRouds).then((hash) => {
        user.password = hash;
    }).then(async () => {
        await em.persist(user).flush();
        return res.status(201).json(user);
    })
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await em.findOne<any>(User, req.params.id);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
