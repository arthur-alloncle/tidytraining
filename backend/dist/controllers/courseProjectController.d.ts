import { Request, Response, NextFunction } from "express";
import { CourseProject } from "../entity/courseProject.entity.js";
import { ApiResponse } from "../types/api-response.js";
export declare const getAllCourseProject: (req: Request, res: Response<ApiResponse<CourseProject[]>>, next: NextFunction) => Promise<Response<ApiResponse<CourseProject[]>, Record<string, any>> | undefined>;
export declare const getCourseProjetById: (req: Request, res: Response<ApiResponse<CourseProject>>, next: NextFunction) => Promise<Response<ApiResponse<CourseProject>, Record<string, any>> | undefined>;
export declare const getCourseProjectByUserId: (req: Request, res: Response<ApiResponse<CourseProject[]>>, next: NextFunction) => Promise<Response<ApiResponse<CourseProject[]>, Record<string, any>> | undefined>;
export declare const addCourseProject: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
