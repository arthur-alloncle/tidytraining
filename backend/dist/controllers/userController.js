import { MikroORM } from "@mikro-orm/mariadb";
import mconfig from "../mikro-orm.config.js";
import { User } from "../entity/user.entity.js";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
const orm = await MikroORM.init(mconfig);
const em = orm.em.fork();
export const createUser = async (req, res, next) => {
    // try {
    console.log(req.body);
    const saltRouds = 10;
    const passwordString = req.body.password;
    const user = new User();
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    bcrypt
        .hash(passwordString, saltRouds)
        .then((hash) => {
        user.password = hash;
    })
        .then(async () => {
        await em.persist(user).flush();
        return res.status(201).json({ success: true, data: user });
    })
        .catch((e) => {
        next(e);
    });
    // } catch (error) {
    // next(error);
    // }
};
export const findUserById = async (req, res, next) => {
    try {
        await em
            .findOne(User, -1)
            .then(async (user) => {
            if (!user)
                throw ApiError.notFound();
            return res.status(200).json({ success: true, data: user });
        })
            .catch((e) => {
            next(e);
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
