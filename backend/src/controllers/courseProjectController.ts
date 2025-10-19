import { Request, Response, NextFunction } from "express";
import { MikroORM } from "@mikro-orm/mariadb";
import mconfig from "../mikro-orm.config.js";
import { CourseProject } from "../entity/courseProject.entity.js";
import { ApiResponse } from "../types/api-response.js";
import { ApiError } from "../utils/ApiError.js";

const orm = await MikroORM.init(mconfig);
const em = orm.em.fork();

export const getAllCourseProject = async (
  req: Request,
  res: Response<ApiResponse<CourseProject[]>>,
  next: NextFunction
) => {
  try {
    const courseProjectList = await em.find(CourseProject, {});
    const response: ApiResponse<CourseProject[]> = {
      success: true,
      data: courseProjectList,
    };
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getCourseProjetById = async (
  req: Request,
  res: Response<ApiResponse<CourseProject>>,
  next: NextFunction
) => {
  try {
    const courseProject = await em.findOne(CourseProject, {
      id: Number(req.params.id),
    });

    if (!courseProject) throw ApiError.notFound("Course project not found");

    const response: ApiResponse<CourseProject> = {
      success: true,
      data: courseProject,
    };
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getCourseProjectByUserId = async (
  req: Request,
  res: Response<ApiResponse<CourseProject[]>>,
  next: NextFunction
) => {
  try {
    const qb = em.createQueryBuilder(CourseProject, "c");
    qb.select(["u.id", "u.*", "c.*"], true)
      .join("c.user", "u")
      .where({ "u.id": req.params.id });
    console.log(qb.getQuery());

    const courseProject = await qb.execute();
    const response: ApiResponse<CourseProject[]> = {success: true, data: courseProject}
    return res.status(200).json(response);
  } catch (err) {
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
    courseProject.title = req.body.title
    courseProject.user = req.body.user;

    const executionResponse = await em.persist(courseProject).flush()
        return res.status(201).json({ executionResponse });
  } catch (error) {
    next(error);
  }
};
