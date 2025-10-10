import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

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
}
