import { Request, Response, NextFunction } from "express";
import { MikroORM } from "@mikro-orm/mariadb";
import mconfig from "../mikro-orm.config.js";
import { CourseProject } from "../entity/courseProject.entity.js";

const orm = await MikroORM.init(mconfig);
const em = orm.em.fork();

export const getAllCourseProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseProjectList = await em.findAll(CourseProject);
    return res.status(200).json({ success: true, data: courseProjectList });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getCourseProjetById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseProject = await em.findOne<any>(CourseProject, req.params.id);
    return res.status(200).json({ success: true, data: courseProject });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getCourseProjectByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const qb = em.createQueryBuilder(CourseProject, "c");
    qb.select(["u.id", "u.*", "c.*"], true)
      .join("c.user", "u")
      .where({ "u.id": 5 }); // !!! Hard coded id = 5 !!! (forecast TT-31)
    console.log(qb.getQuery());

    const courseProject = await qb.execute();
    return res.status(200).json({ status: true, data: courseProject });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const addCourseProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseProject = new CourseProject();
    courseProject.title = req.body.title;

    await em.persist(courseProject).flush();
    return res.status(201).json({ courseProject });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
