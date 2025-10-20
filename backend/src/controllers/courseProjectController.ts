import { Request, Response, NextFunction } from "express";
import { MikroORM, RequestContext } from "@mikro-orm/mariadb";
import mconfig from "../mikro-orm.config.js";
import { CourseProject } from "../entity/courseProject.entity.js";
import { ApiResponse } from "../types/api-response.js";
import { ApiError } from "../utils/ApiError.js";
import { populate } from "dotenv";

const orm = await MikroORM.init(mconfig);

export const getAllCourseProject = async (
  req: Request,
  res: Response<ApiResponse<CourseProject[]>>,
  next: NextFunction
) => {
  try {
    const em = RequestContext.getEntityManager();
    const courseProjectList = await em?.find(CourseProject, {});
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
    const em = RequestContext.getEntityManager();
    const courseProject = await em?.findOne(CourseProject, {
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
  const id = Number(req.params.id);
  const em = RequestContext.getEntityManager();

  try {
    const courseProject = await em?.find(
      CourseProject,
      { user: id },
      { populate: ["user"] }
    );
    const response: ApiResponse<CourseProject[]> = {
      success: true,
      data: courseProject,
    };
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
    const em = RequestContext.getEntityManager();

    const { title, user } = req.body;

    const courseProject = em?.create(CourseProject, {
      title,
      user,
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (!courseProject) {
      throw ApiError.internal();
    }

    const executionResponse = await em?.persistAndFlush(courseProject);
    return res.status(201).json({ executionResponse });
  } catch (error) {
    next(error);
  }
};
