import { MikroORM } from '@mikro-orm/mariadb';
import mconfig from '../mikro-orm.config.js';
import { CourseProject } from '../entity/courseProjectEntity.entity.js';
const orm = await MikroORM.init(mconfig);
const em = orm.em.fork();
export const getAllCourseProject = async (req, res, next) => {
    try {
        const courseProjectList = await em.findAll(CourseProject);
        res.status(200).json({ success: true, data: courseProjectList });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
export const getCourseProjetById = async (req, res, next) => {
    try {
        const courseProject = await em.findOne(CourseProject, req.params.id);
        res.status(200).json({ success: true, data: courseProject });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
export const addCourseProject = async (req, res, next) => {
    try {
        const courseProject = new CourseProject();
        courseProject.title = "Project 2";
        em.persist(courseProject);
        await em.flush();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
