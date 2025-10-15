import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./user.entity.js";

@Entity()
export class CourseProject {
    @PrimaryKey()
    id!: number;

    @Property()
    title!: string;

    @Property()
    created_at = new Date();

    @Property({onUpdate: () => new Date()})
    updated_at = new Date;

    @ManyToOne()
    user!: User
}
