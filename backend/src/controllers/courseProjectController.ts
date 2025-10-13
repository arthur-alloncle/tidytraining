import {Request, Response, NextFunction} from 'express'
import { MikroORM } from '@mikro-orm/mariadb';
import mconfig from '../mikro-orm.config.js';
import { CourseProject } from '../entity/courseProjectEntity.entity.js';

const orm = await MikroORM.init(mconfig);
const em = orm.em.fork()

export const getAllCourseProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseProjectList = await em.findAll(CourseProject);
        return res.status(200).json({success: true, data: courseProjectList});
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export const getCourseProjetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseProject = await em.findOne<any>(CourseProject, req.params.id);
        return res.status(200).json({success: true, data: courseProject});
    } catch(error) {
        console.error(error);
        next(error);
    }
}

export const addCourseProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseProject = new CourseProject();
        courseProject.title = req.body.title

        await em.persist(courseProject).flush()
        return res.status(201).json({courseProject})

    } catch (error) {
        console.error(error)
        next(error)
    }
}