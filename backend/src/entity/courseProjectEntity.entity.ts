import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
@Entity()
export class CourseProjectEntity {
    @PrimaryKey()
    id!: number;

    @Property()
    title!: string;

    @Property({type: 'datetime'})
    created_at = Date;

    @Property({type: 'datetime'})
   updated_at = Date;
}