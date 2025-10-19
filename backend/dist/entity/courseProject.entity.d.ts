import { User } from "./user.entity.js";
export declare class CourseProject {
    id: number;
    title: string;
    created_at: Date;
    updated_at: Date;
    user: User;
}
